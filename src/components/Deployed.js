import React from "react"
import Button from "@material-ui/core/Button"
import Layout from "./Layout"
import WebhookCard from "./WebhookCard"

function Deployed({ removeWebhook, removeData }) {
  return (
    <Layout>
      <WebhookCard />

      <Button variant="outlined" onClick={removeWebhook}>
        Remove Webhook
      </Button>
      <Button variant="outlined" onClick={removeData}>
        Remove Data
      </Button>
    </Layout>
  )
}

export default Deployed
