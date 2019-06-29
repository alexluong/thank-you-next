import request from "request-promise"
import { DEV_SERVER_URL, TWITTER_WEBHOOK_ENV, twitterOauth, isDev } from "../config"

function createWebhook(siteUrl) {
  const options = {
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
    oauth: twitterOauth,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    form: {
      url: `${siteUrl}/.netlify/functions/twitter`,
    },
  }

  // POST request to create webhook config
  return request.post(options)
}

export async function handler(event, context, callback) {
  const siteUrl = process.env.URL

  try {
    const body = await createWebhook(siteUrl)

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(JSON.parse(body)),
    })
  } catch (e) {
    console.log(e.message)

    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    })
  }
}
