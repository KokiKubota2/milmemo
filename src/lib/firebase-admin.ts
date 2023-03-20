import _ from 'lodash'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

let app

if (_.isEqual(process.env.NEXT_PUBLIC_IS_LOCAL, 'true')) {
  try {
    const serviceAccount = require('../../certs/service-account.json')
    if (_.isEmpty(getApps()))
      app = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
      })
  } catch (e) {
    console.error(e)
  }
} else if (_.isEmpty(getApps())) app = initializeApp()

export default app
