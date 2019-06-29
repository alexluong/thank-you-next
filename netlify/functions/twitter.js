import { createCrcResponseToken } from "../utils"
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

  console.log(body)

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
