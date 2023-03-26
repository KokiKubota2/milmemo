'use client'

import _ from 'lodash'
import { getFirestore, collection, orderBy, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { NextPage } from 'next'

import { Stack } from 'components/mui/material'

import { DrankMilkCards, DrinkMilkForm } from 'app'

import { milkConverter } from 'lib/firestoreConverter'

const P: NextPage = () => {
  const db = getFirestore()
  const [milks, loading, error] = useCollectionData(
    query(collection(db, 'milks'), orderBy('drankAt', 'desc')).withConverter(
      milkConverter
    )
  )

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }
  if (loading) return <div>Loading...</div>

  const lastAmount = () => {
    if (_.isEmpty(milks) || loading || error) return 0
    const lastMilk = _.sortBy(milks, 'drankAt', 'desc')[0]
    return lastMilk.amount
  }

  return (
    <Stack spacing={2}>
      <DrinkMilkForm {...{ lastAmount: lastAmount() }} />
      <DrankMilkCards {...{ milks }} />
    </Stack>
  )
}

export default P
