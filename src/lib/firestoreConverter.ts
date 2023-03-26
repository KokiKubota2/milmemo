import _ from 'lodash'
import { DateTime } from 'luxon'

import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const milkConverter: FirestoreDataConverter<MilkProps> = {
  toFirestore(milk: WithFieldValue<MilkProps>): DocumentData {
    return {
      ..._.pick(milk, ['isBreastMilk', 'drankAt']),
      amount: _.toNumber(milk.amount),
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MilkProps {
    const data = snapshot.data(options)
    return {
      ..._.pick(data, ['amount', 'isBreastMilk']),
      drankAt: DateTime.fromJSDate(data.drankAt.toDate()),
      id: snapshot.id,
    }
  },
}
