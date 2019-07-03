import request from "request-promise"
import { addCron, getCron } from "../utils"
import { URL, TWITTER_CONSUMER_SECRET, twitterOauth, cronExpression15 } from "../config"

async function getHandler(event, context) {
  const body = await getCron()

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

async function postHandler(event, context) {
  const analyzeDmUrl = `${URL}/.netlify/functions/analyze-dm`
  const body = await addCron(analyzeDmUrl, cronExpression15)

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

async function putHandler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify("Put"),
  }
}

export async function handler(event, context) {
  try {
    switch (event.httpMethod) {
      case "GET":
        return getHandler(event, context)
      case "POST":
        return postHandler(event, context)
      case "PUT":
        return putHandler(event, context)
      default:
        return {
          statusCode: 410,
          body: JSON.stringify({ message: "Unsupported Request Method" }),
        }
    }
  } catch (e) {
    console.log(e.message)
    return { statusCode: 500, body: JSON.stringify({ message: "Error" }) }
  }
}
