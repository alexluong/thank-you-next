import React from "react"
import axios from "axios"
import TwitterSignIn from "../components/TwitterSignIn"

function IndexPage(props) {
  function handleCreateWebhook() {
    axios.get("/.netlify/functions/create-webhook").then(response => {
      console.log(response)
      console.log(typeof response)
    })
  }

  function handleDeleteWebhook() {
    axios.get("/.netlify/functions/delete-webhook").then(console.log)
  }

  function handleGenerateWhitelist() {
    axios.get("/.netlify/functions/generate-whitelist").then(response => {
      console.log(response)

      localStorage.setItem("messages", response)
    })
  }

  function handleCronAdd() {
    axios.post("/.netlify/functions/cron").then(console.log)
  }

  function handleCronList() {
    axios.get("/.netlify/functions/cron").then(console.log)
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
      <button type="button" onClick={handleGenerateWhitelist}>
        Generate Whitelist
      </button>
      <button type="button" onClick={handleCronAdd}>
        Add Cron Job
      </button>
      <button type="button" onClick={handleCronList}>
        List Cron Jobs
      </button>

      <TwitterSignIn />
    </div>
  )
}

export default IndexPage
