import request from "request-promise"

export function addDeletedMessage(userId, senderId, message) {
  return request.post({
    uri: `${FIREBASE_DATABASE_URL}/${userId}/${senderId}/messages.json`,
    body: JSON.stringify(message),
  })
}
