import { AppBar, Toolbar, Typography } from 'components/mui/material'

type Props = {}

const C: React.FC<Props> = () => (
  <AppBar>
    <Toolbar>
      <Typography variant='h6' component='div'>
        MIL MEMO!
      </Typography>
    </Toolbar>
  </AppBar>
)

export default C
