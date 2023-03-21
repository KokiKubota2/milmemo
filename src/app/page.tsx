'use client'

import _ from 'lodash'
import useSWR from 'swr'
import axios from 'axios'
import { NextPage } from 'next'

import { Stack } from 'components/mui/material'

import { DrankMilkCards, DrinkMilkForm } from 'app'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const P: NextPage = () => {
  const { data, error, isLoading } = useSWR('/api/milks', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404 || retryCount >= 5) return
    },
  })

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }
  if (isLoading) return <div>Loading...</div>

  const lastAmount = () => {
    if (_.isEmpty(data) || isLoading || error) return 0
    const lastMilk = _.sortBy(data, 'drankAt', 'desc')[0]
    return lastMilk.amount
  }

  return (
    <Stack spacing={2}>
      <DrinkMilkForm {...{ lastAmount: lastAmount() }} />
      <DrankMilkCards {...{ milks: data }} />
    </Stack>
  )
}

export default P
