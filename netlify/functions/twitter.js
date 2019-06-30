import request from "request-promise"
import { createCrcResponseToken, isNoGood } from "../utils"
import { TWITTER_CONSUMER_SECRET } from "../config"

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

function postHandler(event, context, callback) {
  const body = JSON.parse(event.body)

  if (!body.direct_message_events) {
    return callback(null, { statusCode: 200 })
  }

  const dmEvent = body.direct_message_events[0]
  const message = dmEvent.message_create
  console.log(message.message_data)
  console.log(message.sender_id)
  console.log(message.source_app_id)

  if (isNoGood(message.text)) {
    request.delete({
      url: `https://api.twitter.com/1.1/direct_messages/events/destroy.json?id=${dmEvent.id}`,
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
