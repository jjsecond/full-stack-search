import { COLLECTION_NAMES } from 'lib/constants/collections'
import { CityProjectionLimited, CityWithId } from 'lib/types/dbTypes'
import { Db } from 'mongodb'

const searchCitiesByPartialName = (
  db: Db,
  partialSearchText: RegExp,
  limit: 10
) => {
  return db
    .collection<CityWithId>(COLLECTION_NAMES.CITIES)
    .find({
      name: { $regex: partialSearchText }
    })
    .project<CityProjectionLimited>({
      _id: 1,
      name: 1
    })
    .limit(limit)
    .toArray()
}

export default searchCitiesByPartialName
