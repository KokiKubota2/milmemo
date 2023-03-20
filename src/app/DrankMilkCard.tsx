import { Box, Card, CardContent, Typography } from 'components/mui/material'
import { EscalatorWarning as EscalatorWarningIcon } from 'components/mui/icons'

import { formatTimestamp } from 'lib/misc'

const C: React.FC<MilkProps> = (props) => {
  const { amount, drankAt, isBreastMilk } = props

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {formatTimestamp(drankAt)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color='text.secondary'>{amount}ml</Typography>
          {isBreastMilk && <EscalatorWarningIcon />}
        </Box>
      </CardContent>
    </Card>
  )
}

export default C
