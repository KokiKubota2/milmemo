'use client'

import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Signin } from 'components'

import firebase from 'lib/firebase'

const C: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = getAuth(firebase)
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  console.log(user?.email, user?.uid)

  if (!user) return <Signin />

  return <>{children}</>
}

export default C
