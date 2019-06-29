import request from "request-promise"
import { DEV_SERVER_URL, TWITTER_WEBHOOK_ENV, twitterOauth, isDev } from "../config"

async function deleteWebhook() {
  // GET request to retreive webhook config
  console.log("Deleting webhook")

  const webhooks = await request.get({
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
    oauth: twitterOauth,
  })

  console.log(webhooks)

  // parse webhook ID
  const webhookId = JSON.parse(webhooks)[0].id

  console.log("Deleting webhook config:", webhookId)

  // DELETE request to delete webhook config
  return request.delete({
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks/${webhookId}.json`,
    oauth: twitterOauth,
    resolveWithFullResponse: true,
  })
}

export async function handler(event, context, callback) {
  try {
    const body = await deleteWebhook()

    console.log(body.statusCode)
    console.log(Object.keys(body))

    if (body.statusCode === 204) {
      callback(null, {
        statusCode: 200,
        body: "Successfully delete webhook",
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      })
    }
  } catch (e) {
    console.log(e.message)

    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    })
  }
}
