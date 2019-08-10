import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

function Layout({ children }) {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: 50 }}>{children}</Container>
    </>
  )
}

export default Layout
