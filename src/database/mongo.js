import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

(async () => {
  await mongoClient.connect();
})();

export default mongoClient.db(process.env.DATABASE_NAME);
