import React from "react"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Layout from "./Layout"

function Init({ init }) {
  return (
    <Layout>
      <Typography>Please click the button to initialize the application.</Typography>

      <Button variant="contained" color="primary" onClick={init}>
        Initialize
      </Button>
    </Layout>
  )
}

export default Init
