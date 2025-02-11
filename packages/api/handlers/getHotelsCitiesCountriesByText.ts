import { Request, Response } from 'express'
import { COLLECTION_NAMES, LIMIT_FOR_MULTI_COLLECTIONS } from 'lib/constants/collections'
import { CityProjectionLimited, CityWithId, CountryProjectionLimited, CountryWithId, HotelProjectionLimited, HotelWithId } from 'lib/types/dbTypes'
import { MongoClient } from 'mongodb'

const getHotelsCitiesCountriesByText = async (req: Request, res: Response) => {
  try {
    const mongoClient = new MongoClient(process.env.DATABASE_URL || '')
    const { textSearch } = req.params

    await mongoClient.connect()
    console.log('Successfully connected to MongoDB!')

    const partialSearchText = new RegExp(textSearch, 'i')

    const db = mongoClient.db()

    const [countries, cities, hotels]: [CountryProjectionLimited[], CityProjectionLimited[], HotelProjectionLimited[]] = await Promise.all([
      db
        .collection<CountryWithId>(COLLECTION_NAMES.COUNTRIES)
        .find({
          country: { $regex: partialSearchText }
        })
        .project<CountryProjectionLimited>({
            _id: 1,
            country:1 
        })
        .limit(LIMIT_FOR_MULTI_COLLECTIONS)
        .toArray(),
      db
        .collection<CityWithId>(COLLECTION_NAMES.CITIES)
        .find({
          name: { $regex: partialSearchText }
        })
        .project<CityProjectionLimited>({
            _id: 1,
            name: 1,
        })
        .limit(LIMIT_FOR_MULTI_COLLECTIONS)
        .toArray(),
      db
        .collection<HotelWithId>(COLLECTION_NAMES.HOTELS)
        .find({
          $or: [
            { hotel_name: { $regex: partialSearchText } },
            { country: { $regex: partialSearchText } }
          ]
        }).project<HotelProjectionLimited>({
            _id: 1,
            hotel_name: 1,
        })
        .limit(LIMIT_FOR_MULTI_COLLECTIONS)
        .toArray()
    ]);

    res.status(200).json({ countries, cities, hotels })
  } catch (error) {
    console.log(
      'Error searching for hotels,cities and countries by text ',
      error
    )
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export default getHotelsCitiesCountriesByText
