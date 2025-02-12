import dbConnection from 'db/dbConnection/dbConnection';
import { Request, Response } from 'express';
import { COLLECTION_NAMES } from 'lib/constants/collections';
import isValidMongoId from 'lib/helperFunctions/isValidMongoId';
import { ObjectId } from 'mongodb';

const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const isValidId = isValidMongoId(id);

  if (!isValidId) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const db = await dbConnection();

    const collection = db.collection(COLLECTION_NAMES.HOTELS);

    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: 'No hotel found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(`Error searching for hotel by id: ${id}`, error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default getHotelById;
