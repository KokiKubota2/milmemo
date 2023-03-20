import { NextPage } from 'next'

import { Stack } from 'components/mui/material'

import { DrinkMilkButton, DrankMilkCards } from 'app'
import { Timestamp } from 'firebase/firestore'

const DANNY_DATA = {
  hoge: { amount: 100, drankAt: Timestamp.now(), isBreastMilk: true },
  foo: { amount: 120, drankAt: Timestamp.now(), isBreastMilk: false },
}

const P: NextPage = () => (
  <Stack spacing={2}>
    <DrinkMilkButton />
    <DrankMilkCards {...{ milks: DANNY_DATA }} />
  </Stack>
)

export default P
