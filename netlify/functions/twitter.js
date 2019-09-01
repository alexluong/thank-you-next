import request from "request-promise"
import { createCrcResponseToken, isNoGood } from "../utils"
import { TWITTER_CONSUMER_SECRET, twitterOauth } from "../config"
import { deleteMessage } from "../actions/twitter"
import { addDeletedMessage } from "../actions/firebase"

function getHandler(event, context, callback) {
  const crcToken = event.queryStringParameters.crc_token

  console.log(crcToken)
  console.log(TWITTER_CONSUMER_SECRET)
  console.log(createCrcResponseToken(crcToken, TWITTER_CONSUMER_SECRET))

  if (crcToken) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        response_token: createCrcResponseToken(crcToken, TWITTER_CONSUMER_SECRET),
      }),
    })
  } else {
    callback(null, { statusCode: 400, body: "Error: crc_token missing from request." })
  }
}

async function postHandler(event, context, callback) {
  const body = JSON.parse(event.body)
  console.log(body)

  if (!body.direct_message_events) {
    return callback(null, { statusCode: 200 })
  }

  const dmEvent = body.direct_message_events[0]

  // if (dmEvent.for_user_id === "")

  const message = dmEvent.message_create
  const text = message.message_data.text

  if (isNoGood(text)) {
    console.log("Deleting message: " + text)
    deleteMessage(dmEvent.id)
    addDeletedMessage(message.target.recipient_id, message.sender_id, {
      message: text,
    })
  }

  callback(null, { statusCode: 200 })
}

export function handler(event, context, callback) {
  switch (event.httpMethod) {
    case "GET":
      return getHandler(event, context, callback)
    case "POST":
      return postHandler(event, context, callback)
    default:
      return callback(null, { statusCode: 410, body: "Unsupported Request Method" })
  }
}
