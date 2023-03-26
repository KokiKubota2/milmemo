import _ from 'lodash'
import { initializeApp, getApps, getApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJEC_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const firebaseApp = _.isEmpty(getApps()) ? initializeApp(config) : getApp()

export default firebaseApp
