import request from "request-promise"
import { TWITTER_ENVIRONMENT, twitterOauth } from "../config/twtitter"

function createWebhook(siteUrl) {
  const options = {
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_ENVIRONMENT}/webhooks.json`,
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
