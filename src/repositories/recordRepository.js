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

export async function deleteById(recordId) {
  return db.collection('records').findOneAndDelete({ _id: ObjectId(recordId) });
}

export async function updateById(recordId, { value, description }) {
  return db
    .collection('records')
    .findOneAndUpdate(
      { _id: ObjectId(recordId) },
      { $set: { value, description } }
    );
}

export default create;
