'use client'

import { getAuth } from 'firebase/auth'
import { getFirestore, doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Signin } from 'components'

const C: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = getAuth()
  const db = getFirestore()
  const [user, loading, error] = useAuthState(auth)
  const [userDoc, userDocLoading] = useDocument(
    user && doc(db, `users/${user.uid}`)
  )

  if (loading || userDocLoading) return <>Loading...</>
  if (error) {
    console.error(error)
    return <>Error</>
  }

  console.log(user?.email, user?.uid)

  if (!user) return <Signin />
  if (!userDoc?.exists()) return <>Not Allowed User</>

  return <>{children}</>
}

export default C
