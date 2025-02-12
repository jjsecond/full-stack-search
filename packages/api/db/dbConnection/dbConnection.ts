import { MongoClient, Db } from 'mongodb';

let mongoClient: MongoClient | null = null;
let db: Db | null = null;

// TODO: look at logic to reestablish the connection if it is lost
// TODO: look into connection pooling as a solution https://www.mongodb.com/docs/manual/administration/connection-pool-overview/
const dbConnection = async (): Promise<Db> => {
  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(process.env.DATABASE_URL || '');
      await mongoClient.connect();
      db = mongoClient.db();
      console.log('Successfully connected to MongoDB!');
    }

    if (!db) {
      throw new Error('Database connection failed');
    }

    return db;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default dbConnection;
