import 'lib/firebase-admin'

import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { querySnapToObj } from 'lib/misc'

const db = getFirestore()

export const GET = async (request: NextRequest) => {
  const organizationId = 'W8Ol0QGqBEQxwweXp4nq' //ToDo: get from req.user

  const milks = await db
    .collection(`organizations/${organizationId}/milks`)
    .orderBy('drankAt', 'desc')
    .get()
    .then((s) => querySnapToObj(s))

  return NextResponse.json(milks)
}

export const POST = async (request: NextRequest) => {
  const { amount, isBreastMilk } = await request.json()

  const organizationId = 'W8Ol0QGqBEQxwweXp4nq' //ToDo: get from req.user
  await db.collection(`organizations/${organizationId}/milks`).add({
    amount,
    isBreastMilk,
    drankAt: Timestamp.now(),
  })

  return NextResponse.json({ success: true })
}
