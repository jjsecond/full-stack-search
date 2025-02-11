import { Request, Response } from 'express';
import { COLLECTION_NAMES } from "lib/constants/collections";
import { MongoClient } from 'mongodb';

const getCountriesByName = async (req: Request, res: Response) =>{
    // TODO: Sort out type on url
      const mongoClient = new MongoClient(process.env.DATABASE_URL || '');

      // TODO: Check that it is valid
      const { name } = req.params;
    
      try {
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB!');

        const countryName = new RegExp(name, 'i');

        const db = mongoClient.db()
        const collection = db.collection(COLLECTION_NAMES.COUNTRIES);

        let result = await collection.find(
            { country: {$regex: countryName }}).limit(10).toArray();

        res.status(200).json(result)
      } finally {
        await mongoClient.close();
      }
};


export default getCountriesByName;