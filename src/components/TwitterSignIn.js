import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"

function TwitterSignIn() {
  const firebase = React.useContext(FirebaseContext)

  async function handleSignIn() {
    try {
      const result = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())

      const token = result.credential.accessToken
      const secret = result.credential.secret
      const profile = result.additionalUserInfo.profile

      const user = {
        id: profile.id,
        name: profile.name,
        screenName: profile.screen_name,
        imageUrl: profile.profile_image_url_https,
      }

      firebase
        .database()
        .ref(`users/${user.id}/profile`)
        .set(user)

      console.log({ token, secret, user })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button type="button" onClick={handleSignIn}>
      Sign In With Twitter
    </button>
  )
}

export default TwitterSignIn
