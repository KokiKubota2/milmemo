import _ from 'lodash'
import { DateTime } from 'luxon'

export const formatTimestamp = (t: { _seconds: number }) =>
  DateTime.fromSeconds(t._seconds).toFormat('yyyy-MM-dd HH:mm')

export const querySnapToObj = (snap: any) =>
  _.transform(
    snap.docs,
    (result: any, doc) => {
      result[doc.id] = doc.data()
    },
    {}
  )
