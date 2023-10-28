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
} from 'firebase/firestore'
import { NextPage } from 'next'
import { useState } from 'react'

import { Stack, Typography } from 'components/mui/material'

import { useEffect } from 'react'

const P: NextPage = () => {
  const db = getFirestore()
  const [todayTotal, setTodayTotal] = useState(0)

  useEffect(() => {
    getAggregateFromServer(
      query(
        collection(db, 'milks'),
        orderBy('drankAt'),
        startAt(DateTime.now().startOf('day').toJSDate())
      ),
      { todayTotal: sum('amount') }
    ).then((s) => setTodayTotal(s.data().todayTotal))
  }, [])

  return (
    <Stack direction='row'>
      <Typography color='text.secondary'>今日の合計：</Typography>
      <Typography color='text.primary'>{todayTotal}ml</Typography>
    </Stack>
  )
}

export default P
