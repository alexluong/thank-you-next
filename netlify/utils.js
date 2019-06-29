import crypto from "crypto"
import noGood from "./no-good"

export function createCrcResponseToken(crcToken, consumerSecret) {
  const hmac = crypto
    .createHmac("sha256", consumerSecret)
    .update(crcToken)
    .digest("base64")

  return `sha256=${hmac}`
}

const trim = word => word.replace(/[^\w]/g, "")
const toLowerCase = word => word.toLowerCase()
const checkNoGood = word => noGood.includes(word)

export function isNoGood(message) {
  const tokens = message
    .split(" ")
    .filter(word => word.match(/[a-z]/i))
    .map(trim)
    .map(toLowerCase)
    .map(checkNoGood)

  const numTrue = tokens.reduce((num, isTrue) => (isTrue ? num + 1 : num))
  const percent = (numTrue * 100) / tokens.length

  return percent > 50
}
