import _ from 'lodash'
import { DateTime } from 'luxon'

export const formatTimestamp = (t: DateTime) => t.toFormat('yyyy-MM-dd HH:mm')

export const querySnapToObj = (snap: any) =>
  _.transform(
    snap.docs,
    (result: any, doc) => {
      result[doc.id] = { ...doc.data(), id: doc.id }
    },
    {}
  )
