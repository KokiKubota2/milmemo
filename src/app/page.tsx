'use client'

import _ from 'lodash'
import {
  getFirestore,
  collection,
  orderBy,
  query,
  limit,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { NextPage } from 'next'

import { Stack } from 'components/mui/material'

import {
  DrankMilkCards,
  DrinkMilkForm,
  DrankMilkTotal,
  ElapsedMinutes,
} from 'app'

import { milkConverter } from 'lib/firestoreConverter'

const P: NextPage = () => {
  const db = getFirestore()
  const [milks, loading, error] = useCollectionData(
    query(
      collection(db, 'milks'),
      orderBy('drankAt', 'desc'),
      limit(20)
    ).withConverter(milkConverter)
  )

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }
  if (loading) return <div>Loading...</div>

  const latestDrankMilk = (() => {
    if (_.isEmpty(milks) || loading || error) return 0
    const lastestMilk = _.orderBy(milks, 'drankAt', 'desc')[0]

    return lastestMilk
  })() as MilkProps

  return (
    <Stack spacing={2}>
      <DrinkMilkForm {...{ latestDrankMilk }} />
      <Stack spacing={1}>
        <DrankMilkTotal />
        <ElapsedMinutes {...{ latestDrankMilk }} />
      </Stack>
      <DrankMilkCards {...{ milks }} />
    </Stack>
  )
}

export default P
