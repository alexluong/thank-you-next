import request from "request-promise"
import merge from "lodash.merge"
import { disableCron, getCron } from "../utils"
import { FIREBASE_DATABASE_URL, twitterOauth, cronExpression15 } from "../config"

export async function handler(event, context, callback) {
  try {
    const body = JSON.parse(event.body)

    const cursor = await request.get({
      url: `${FIREBASE_DATABASE_URL}/public/cursor.json`,
      json: true,
    })

    if (body.init) {
      await analyze()
    } else if (!cursor || cursor === "noop") {
      // This scenario should never happen
      await cleanUp()
    } else {
      await analyze()
    }
  } catch (e) {
    console.log(e)
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Hello"),
  }
}

async function cleanUp() {
  const disableCronPromise = performDisablingCron()
  const editCursorPromise = editCursor("noop")

  await Promise.all([disableCronPromise, editCursorPromise])
}

async function performDisablingCron() {
  const crons = await getCron()
  const cron15 = crons.cron_jobs.find(cron => cron.cron_expression === cronExpression15)
  const cronId = cron15.cron_job_id
  return disableCron(cronId)
}

async function analyze() {
  const data = await request.get({
    uri: `${FIREBASE_DATABASE_URL}/public.json`,
    json: true,
  })

  const { cursor, twitterId, whitelist } = data

  const dms = await getAllDm(cursor === "noop" ? null : cursor)
  console.log(dms.messages.length)

  const sentMessages = getSentMessages(dms.messages, twitterId)
  const newWhitelist = createWhitelist(sentMessages)
  const mergedWhitelist = merge(whitelist, newWhitelist)

  let doMoreAnalysis = true

  if (!dms.cursor) {
    doMoreAnalysis = false
  }

  // Stop if after analysis, no more whitelist account is added ??
  // if (Object.keys(whitelist).length === Object.keys(mergedWhitelist)) {
  //   doMoreAnalysis = false
  // }

  await request.put({
    uri: `${FIREBASE_DATABASE_URL}/public.json`,
    body: JSON.stringify({
      twitterId,
      cursor: (doMoreAnalysis && dms.cursor) || "noop",
      whitelist: mergedWhitelist,
    }),
  })

  if (!doMoreAnalysis) {
    console.log("Disabling Cron")
    performDisablingCron()
  }
}

async function getAllDm(currentCursor) {
  let messages = []
  let cursor = currentCursor
  for (let i = 0; i < 15; i++) {
    console.log("Getting messages from Twitter")
    const cursorParam = cursor ? `&cursor=${cursor}` : ""
    const newMessages = await getDm(cursorParam)

    if (!newMessages) {
      console.log("No more new messages")
      break
    }

    messages = [...messages, ...newMessages.events]
    cursor = newMessages.next_cursor

    if (!cursor) {
      console.log("No more cursor")
      break
    }
  }
  return { messages, cursor }
}

async function getDm(cursorParam) {
  let messages
  try {
    const response = await request.get({
      uri: `https://api.twitter.com/1.1/direct_messages/events/list.json?count=50${cursorParam}`,
      oauth: twitterOauth,
      json: true,
    })
    return response
  } catch (e) {
    console.log(e.message)
    return messages
  }
}

function getSentMessages(messages, userId) {
  return messages.filter(message => message.message_create.sender_id === userId)
}

function createWhitelist(messages) {
  const whitelist = new Set()
  messages.forEach(message => whitelist.add(message.message_create.target.recipient_id))
  return Array.from(whitelist).reduce((a, v) => {
    a[v] = true
    return a
  }, {})
}
