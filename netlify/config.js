export const URL = process.env.URL
export const EASYCRON_API_TOKEN = process.env.EASYCRON_API_TOKEN
export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
export const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
export const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
export const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET
export const TWITTER_WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV

export const twitterOauth = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  token: TWITTER_ACCESS_TOKEN,
  token_secret: TWITTER_ACCESS_TOKEN_SECRET,
}

export const twitterConsumerAuth = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
}
