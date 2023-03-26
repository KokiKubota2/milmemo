import { getAuth } from 'firebase/auth'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { Button } from 'components/mui/material'

const C: React.FC = () => {
  const auth = getAuth()
  const [signInWithGoogle, , loading] = useSignInWithGoogle(auth)

  return (
    <Button
      disabled={loading}
      variant='contained'
      onClick={() => signInWithGoogle()}>
      Google サインイン
    </Button>
  )
}

export default C
