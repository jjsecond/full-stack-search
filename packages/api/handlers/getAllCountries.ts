import { MongoClient } from "mongodb";
import { Request, Response } from 'express';
import { COLLECTION_NAMES } from "lib/constants/collections";

const getAllCountries = async (req: Request, res: Response) =>{
    // TODO: Sort out type on url
      const mongoClient = new MongoClient(process.env.DATABASE_URL || '');
      console.log('Connecting to MongoDB...');
    
      try {
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB!');
        const db = mongoClient.db()
        const collection = db.collection(COLLECTION_NAMES.COUNTRIES);
        res.send(await collection.find().toArray())
      } finally {
        await mongoClient.close();
      }
};


export default getAllCountries;