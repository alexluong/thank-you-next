import React from "react"

function IndexPage(props) {
  const siteUrl = props.location.origin

  function handleCreateWebhook() {
    fetch(`/.netlify/functions/create-webhook?siteUrl=${siteUrl}`)
      .then(response => response.json())
      .then(console.log)
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
