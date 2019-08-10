import { Machine } from "xstate"

const machine = Machine({
  id: "state",
  initial: "init",
  states: {
    init: {
      on: {
        INIT: "ready",
      },
    },
    ready: {
      on: {
        DEPLOY: "deployed",
      },
    },
    deployed: {
      on: {
        REMOVE_WEBHOOK: "ready",
        REMOVE_DATA: "init",
      },
    },
  },
})

export default machine
