import request from "request-promise"
import { URL, TWITTER_WEBHOOK_ENV, twitterOauth } from "../config"

async function getHandler(event, context) {
  console.log("GET webhook")

  return {
    statusCode: 200,
    body: JSON.stringify("GET"),
  }
}

async function postHandler(event, context) {
  const options = {
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
    oauth: twitterOauth,
    form: {
      url: `${URL}/.netlify/functions/twitter`,
    },
  }
  const response = await request.post(options)
  const body = JSON.parse(response)

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

async function deleteHandler(event, context) {
  const body = JSON.parse(event.body)
  const { webhookId } = body

  const response = await request.delete({
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks/${webhookId}.json`,
    oauth: twitterOauth,
    resolveWithFullResponse: true,
  })
  const responseBody = JSON.parse(response)

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

export async function handler(event, context) {
  try {
    switch (event.httpMethod) {
      case "GET":
        return getHandler(event, context)
      case "POST":
        return postHandler(event, context)
      case "DELETE":
        return deleteHandler(event, context)
      default:
        return {
          statusCode: 410,
          body: JSON.stringify({ message: "Unsupported Request Method" }),
        }
    }
  } catch (e) {
    console.log(e.message)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    }
  }
}
