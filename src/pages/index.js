import React from "react"
import firebase from "firebase/app"

function IndexPage(props) {
  firebase
    .database()
    .ref("whitelist/123")
    .once("value")
    .then(a => console.log(a.val()))

  function handleCreateWebhook() {
    fetch(`/.netlify/functions/create-webhook`)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(response => {
        console.log(response)
        console.log(typeof response)
      })
  }

  function handleDeleteWebhook() {
    fetch(`/.netlify/functions/delete-webhook`)
      .then(response => response.json())
      .then(console.log)
  }

  return (
    <div>
      <p>Hello world!</p>
      <button type="button" onClick={handleCreateWebhook}>
        Create Webhook
      </button>
      <button type="button" onClick={handleDeleteWebhook}>
        Delete Webhook
      </button>
    </div>
  )
}

export default IndexPage
