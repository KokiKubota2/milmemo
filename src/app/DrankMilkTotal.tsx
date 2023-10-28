'use client'

import _ from 'lodash'
import { DateTime } from 'luxon'
import {
  getFirestore,
  collection,
  query,
  sum,
  getAggregateFromServer,
  startAt,
  orderBy,
  count,
} from 'firebase/firestore'
import { NextPage } from 'next'
import { useState } from 'react'

import { Stack, Typography } from 'components/mui/material'

import { useEffect } from 'react'

const P: NextPage = () => {
  const db = getFirestore()
  const [todayTotal, setTodayTotal] = useState({ sum: 0, count: 0 })

  useEffect(() => {
    getAggregateFromServer(
      query(
        collection(db, 'milks'),
        orderBy('drankAt'),
        startAt(DateTime.now().startOf('day').toJSDate())
      ),
      { sum: sum('amount'), count: count() }
    ).then((s) => setTodayTotal(s.data()))
  }, [])

  return (
    <Stack direction='row'>
      <Typography color='text.secondary'>今日の合計：</Typography>
      <Typography color='text.primary'>
        {todayTotal.sum}ml（{todayTotal.count}回）
      </Typography>
    </Stack>
  )
}

export default P
