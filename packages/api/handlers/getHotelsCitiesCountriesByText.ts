import { Request, Response } from 'express'
import { COLLECTION_NAMES } from 'lib/constants/collections'
import { MongoClient } from 'mongodb'

const getHotelsCitiesCountriesByText = async (req: Request, res: Response) => {
  try {
    const mongoClient = new MongoClient(process.env.DATABASE_URL || '')
    const { textSearch } = req.params

    await mongoClient.connect()
    console.log('Successfully connected to MongoDB!')

    const partialSearchText = new RegExp(textSearch, 'i')

    const db = mongoClient.db()

    const [countries, cities, hotels] = await Promise.all([
      db
        .collection(COLLECTION_NAMES.COUNTRIES)
        .find({
          country: { $regex: partialSearchText }
        })
        .limit(10)
        .toArray(),
      db
        .collection(COLLECTION_NAMES.CITIES)
        .find({
          name: { $regex: partialSearchText }
        })
        .limit(10)
        .toArray(),
      db
        .collection(COLLECTION_NAMES.HOTELS)
        .find({
          $or: [
            { hotel_name: { $regex: partialSearchText } },
            { country: { $regex: partialSearchText } }
          ]
        })
        .limit(10)
        .toArray()
    ])

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
