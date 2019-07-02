import React from "react"
import firebase from "firebase/app"

const provider = new firebase.auth.TwitterAuthProvider()
const database = firebase.database()

function TwitterSignIn() {
  async function handleSignIn() {
    try {
      const result = await firebase.auth().signInWithPopup(provider)

      const token = result.credential.accessToken
      const secret = result.credential.secret
      const profile = result.additionalUserInfo.profile

      const user = {
        id: profile.id,
        name: profile.name,
        screenName: profile.screen_name,
        imageUrl: profile.profile_image_url_https,
      }

      database.ref(`users/${user.id}/profile`).set(user)

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
