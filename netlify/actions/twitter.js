import request from "request-promise"
import { TWITTER_WEBHOOK_ENV, twitterOauth } from "../config"

export function deleteMessage(id) {
  return request.delete({
    url: `https://api.twitter.com/1.1/direct_messages/events/destroy.json?id=${id}`,
    oauth: twitterOauth,
  })
}

export function getWebhook() {
  return request.get({
    url: `https://api.twitter.com/1.1/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
    oauth: twitterOauth,
  })
}
