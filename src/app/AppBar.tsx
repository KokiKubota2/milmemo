'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from 'firebase/auth'

import { AppBar, Toolbar, Typography, Button } from 'components/mui/material'

import firebase from 'lib/firebase'

const C: React.FC = () => {
  const auth = getAuth(firebase)
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='div'>
          MIL MEMO!
        </Typography>
        {user && (
          <Button
            variant='contained'
            color='info'
            onClick={() => signOut(auth)}>
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default C
