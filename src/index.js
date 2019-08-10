import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"
import SignIn from "./components/SignIn"

function Main({ children }) {
  const [user, setUser] = React.useState(undefined)

  useFirebase(firebase => {
    const unlisten = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => {
      unlisten()
    }
  })

  if (user === null) {
    return <SignIn />
  }

  return React.cloneElement(children, { user })
}

export default Main
