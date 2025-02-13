import { COLLECTION_NAMES } from 'lib/constants/collections';
import { CountryProjectionLimited, CountryWithId } from 'lib/types/dbTypes';
import { Db } from 'mongodb';

const searchCountriesByPartialCountry = (
  db: Db,
  partialSearchText: RegExp,
  limit: number,
) => {
  return db
    .collection<CountryWithId>(COLLECTION_NAMES.COUNTRIES)
    .find({
      country: { $regex: partialSearchText },
    })
    .project<CountryProjectionLimited>({
      _id: 1,
      country: 1,
    })
    .limit(limit)
    .toArray();
};

export default searchCountriesByPartialCountry;
