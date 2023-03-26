'use client'

import { DateTime } from 'luxon'
import { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Stack,
} from 'components/mui/material'

import { milkConverter } from 'lib/firestoreConverter'

type Props = { lastAmount: string | number }

const C: React.FC<Props> = ({ lastAmount }) => {
  const db = getFirestore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [drankDate, setDrankDate] = useState(
    DateTime.now().toFormat('yyyyMMdd')
  )
  const [drankTime, setDrankTime] = useState(DateTime.now().toFormat('HHmm'))
  const [amount, setAmount] = useState(lastAmount || 0)
  const [isBreastMilk, setIsBreastMilk] = useState(false)

  const onSubmit = async () => {
    setIsSubmitting(true)
    await addDoc(collection(db, 'milks').withConverter(milkConverter), {
      drankAt: DateTime.fromFormat(
        `${drankDate}${drankTime}`,
        'yyyyMMddHHmm'
      ).toJSDate(),
      amount,
      isBreastMilk,
    })
    try {
    } catch (e) {
      console.error(e)
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <Box>
        <Stack spacing={2}>
          <Stack spacing={2} direction='row'>
            <TextField
              value={drankDate}
              size='small'
              onChange={({ target }) => setDrankDate(target.value)}
              label='日にち'
            />
            <TextField
              value={drankTime}
              size='small'
              onChange={({ target }) => setDrankTime(target.value)}
              label='時間'
            />
          </Stack>
          <Stack spacing={2} direction='row'>
            <TextField
              value={amount}
              size='small'
              onChange={({ target }) => setAmount(target.value)}
              label='ミルクの量(ml)'
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setIsBreastMilk(!isBreastMilk)}
                  checked={isBreastMilk}
                />
              }
              label='母乳'
              labelPlacement='start'
            />
          </Stack>
        </Stack>
      </Box>

      <Button
        variant='contained'
        fullWidth
        onClick={onSubmit}
        disabled={isSubmitting}>
        ミルク飲みます！
      </Button>
    </>
  )
}

export default C
