import request from "request-promise"
import { createCrcResponseToken, isNoGood } from "../utils"
import { URL, EASYCRON_API_TOKEN, TWITTER_CONSUMER_SECRET, twitterOauth } from "../config"

const EASYCRON_URL = "https://www.easycron.com/rest"

async function getHandler(event, context) {
  const uri = `${EASYCRON_URL}/list?token=${EASYCRON_API_TOKEN}`
  const response = await request.get({ uri })
  const body = JSON.parse(response)

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

async function postHandler(event, context) {
  const analyzeDmUrl = `${URL}/.netlify/functions/analyze-dm`
  const url = `${EASYCRON_URL}/add?token=${EASYCRON_API_TOKEN}&cron_expression=*/15 * * * *&url=${analyzeDmUrl}`
  const encodedUrl = encodeURI(url)

  const response = await request.get({ uri: encodedUrl })
  const body = JSON.parse(response)

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
