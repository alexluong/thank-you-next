import React from "react"
import { useMachine } from "@xstate/react"

import machine from "../components/machine"
import Init from "../components/Init"
import Ready from "../components/Ready"
import Deployed from "../components/Deployed"

function IndexPage(props) {
  const [current, send] = useMachine(machine)

  if (current.matches("init")) {
    return <Init init={() => send("INIT")} />
  } else if (current.matches("ready")) {
    return <Ready deploy={() => send("DEPLOY")} />
  } else if (current.matches("deployed")) {
    return (
      <Deployed
        removeWebhook={() => send("REMOVE_WEBHOOK")}
        removeData={() => send("REMOVE_DATA")}
      />
    )
  }
}

export default IndexPage
