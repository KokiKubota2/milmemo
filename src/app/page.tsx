'use client'

import _ from 'lodash'
import useSWR, { useSWRConfig } from 'swr'
import axios from 'axios'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import {
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from 'components/mui/material'

import { DrankMilkCards } from 'app'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const P: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState('0')
  const [isBreastMilk, setIsBreastMilk] = useState(false)

  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR('/api/milks', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404 || retryCount >= 5) return
    },
  })
  useEffect(() => {
    if (_.isEmpty(data) || isLoading || error) return
    const lastMilk = _.sortBy(data, 'drankAt', 'desc')[0]
    setAmount(lastMilk.amount)
  }, [data, isLoading, error])

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }
  if (isLoading) return <div>Loading...</div>

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch('/api/milks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, isBreastMilk }),
      })
      // await axios.post('/api/milks', JSON.stringify({ amount, isBreastMilk }))
    } catch (e) {
      console.error(e)
    }
    setIsSubmitting(false)
    mutate('/api/milks')
  }

  return (
    <Stack spacing={2}>
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

      <DrankMilkCards {...{ milks: data }} />
    </Stack>
  )
}

export default P
