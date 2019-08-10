import React from "react"
import Button from "@material-ui/core/Button"
import Layout from "./Layout"

function Ready({ deploy }) {
  return (
    <Layout>
      <Button variant="contained" color="primary" onClick={deploy}>
        Deploy Webhook
      </Button>
    </Layout>
  )
}

export default Ready
