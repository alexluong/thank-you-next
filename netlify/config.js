export const URL = process.env.URL

export const EASYCRON_URL = "https://www.easycron.com/rest"
export const EASYCRON_API_TOKEN = process.env.EASYCRON_API_TOKEN

export const FIREBASE_DATABASE_URL = process.env.GATSBY_FIREBASE_DATABASE_URL

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

// Make it 16min to ensure Twitter renew our rate limit
export const cronExpression15 = "*/16 * * * *"
