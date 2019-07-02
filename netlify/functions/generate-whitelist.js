import request from "request-promise"
import { twitterOauth } from "../config"

async function getAllDM(messages) {
  console.log("Getting")

  try {
    if (messages && (!messages.next_cursor || messages.events.length === 0)) {
      return messages
    }

    const cursorParam = messages && messages.next_cursor ? `&cursor=${messages.next_cursor}` : ""

    let newMessages = await request.get({
      url: `https://api.twitter.com/1.1/direct_messages/events/list.json?count=50${cursorParam}`,
      oauth: twitterOauth,
    })
    newMessages = JSON.parse(newMessages)

    if (messages) {
      newMessages.events = [...messages.events, ...newMessages.events]
    }

    return getAllDM(newMessages)
  } catch (error) {
    console.log(error)
    return messages
  }
}

export async function handler(event, context, callback) {
  try {
    const messages = await getAllDM()

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: messages }),
    })
  } catch (error) {
    console.log(error)

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    }
  }
}
