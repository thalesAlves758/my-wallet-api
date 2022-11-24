import { ObjectId } from 'mongodb';
import db from '../database/mongo.js';

async function create({ value, description, type, userId }) {
  return db.collection('records').insertOne({
    type,
    description,
    value,
    date: Date.now(),
    userId: ObjectId(userId),
  });
}

export default create;
