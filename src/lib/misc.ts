import { DateTime } from 'luxon'
import { Timestamp } from 'firebase/firestore'

export const formatTimestamp = (t: Timestamp) =>
  DateTime.fromJSDate(t.toDate()).toFormat('yyyy-MM-dd HH:mm:ss')
