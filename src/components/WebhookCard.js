import React from "react"
import axios from "axios"
import { format } from "date-fns"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

function WebhookCard() {
  const [webhook, setWebhook] = React.useState(null)

  React.useEffect(() => {
    axios.get("/.netlify/functions/webhook").then(res => {
      console.log(res)
      setWebhook(res.data[0])
    })
  }, [])

  if (!webhook) return null

  return (
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h4" color="primary">
          Webhook
        </Typography>
        <Typography>URL: {webhook.url}</Typography>
        <Typography>ID: {webhook.id}</Typography>
        <Typography>
          {format(
            new Date(
              webhook.created_timestamp.substring(0, webhook.created_timestamp.indexOf(" ")),
            ),
            "MMM DD, YYYY",
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WebhookCard
