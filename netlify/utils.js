import crypto from "crypto"
import request from "request-promise"
import noGood from "./no-good"
import { EASYCRON_URL, EASYCRON_API_TOKEN } from "./config"

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

export function getCron() {
  const uri = `${EASYCRON_URL}/list?token=${EASYCRON_API_TOKEN}`
  return request.get({ uri, json: true })
}

export function addCron(url, expression) {
  const uri = `${EASYCRON_URL}/add?token=${EASYCRON_API_TOKEN}&cron_expression=${expression}&url=${url}`
  return request.get({ uri, json: true })
}

export function enableCron() {
  const uri = `${EASYCRON_URL}/enable?token=${EASYCRON_API_TOKEN}&id=${cronId}`
  return request.get({ uri, json: true })
}

export function disableCron(cronId) {
  const uri = `${EASYCRON_URL}/disable?token=${EASYCRON_API_TOKEN}&id=${cronId}`
  return request.get({ uri, json: true })
}

export function editCursor(cursor) {
  return request.put({
    uri: `${FIREBASE_DATABASE_URL}/public/cursor.json`,
    body: JSON.stringify(cursor),
  })
}
