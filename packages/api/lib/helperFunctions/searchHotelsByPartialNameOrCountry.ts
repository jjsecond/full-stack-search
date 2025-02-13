import { COLLECTION_NAMES } from 'lib/constants/collections';
import { HotelProjectionLimited, HotelWithId } from 'lib/types/dbTypes';
import { Db } from 'mongodb';

const searchHotelsByPartialNameOrCountry = (
  db: Db,
  partialSearchText: RegExp,
  limit: number,
) => {
  return db
    .collection<HotelWithId>(COLLECTION_NAMES.HOTELS)
    .find({
      $or: [
        { hotel_name: { $regex: partialSearchText } },
        { country: { $regex: partialSearchText } },
      ],
    })
    .project<HotelProjectionLimited>({
      _id: 1,
      hotel_name: 1,
    })
    .limit(limit)
    .toArray();
};

export default searchHotelsByPartialNameOrCountry;
