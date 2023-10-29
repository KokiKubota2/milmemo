'use client'

import _ from 'lodash'

import { Stack, Typography } from 'components/mui/material'

type Props = { latestDrankMilk: MilkProps }

const C: React.FC<Props> = ({ latestDrankMilk }) => {
  const elapsedMinutes = _.floor(
    -latestDrankMilk.drankAt.diffNow().as('minutes')
  )

  return (
    <Stack direction='row'>
      <Typography color='text.secondary'>前回のミルクから</Typography>
      <Typography color='text.primary'>
        {_.floor(elapsedMinutes / 60)}時間{elapsedMinutes % 60}分
      </Typography>
    </Stack>
  )
}

export default C
