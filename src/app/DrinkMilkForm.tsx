'use client'

import { useSWRConfig } from 'swr'
import axios from 'axios'
import { useState } from 'react'

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from 'components/mui/material'

type Props = { lastAmount: string }

const C: React.FC<Props> = ({ lastAmount }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState(lastAmount)
  const [isBreastMilk, setIsBreastMilk] = useState(false)

  const { mutate } = useSWRConfig()

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      console.log({ amount, isBreastMilk })
      await axios.post('/api/milks', { amount: 100, isBreastMilk: true })
    } catch (e) {
      console.error(e)
    }
    setIsSubmitting(false)
    mutate('/api/milks')
  }

  return (
    <>
      <Box>
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
