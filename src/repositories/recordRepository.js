import { ObjectId } from 'mongodb';
import db from '../database/mongo.js';

export async function create({ value, description, type, userId }) {
  return db.collection('records').insertOne({
    type,
    description,
    value,
    date: Date.now(),
    userId: ObjectId(userId),
  });
}

export async function deleteByIdAndUserId(recordId, userId) {
  const result = await db
    .collection('records')
    .findOneAndDelete({ _id: ObjectId(recordId), userId: ObjectId(userId) });

  return result.value;
}

export async function updateByIdAndUserId(
  recordId,
  userId,
  { value, description }
) {
  const result = await db
    .collection('records')
    .findOneAndUpdate(
      { _id: ObjectId(recordId), userId: ObjectId(userId) },
      { $set: { value, description } }
    );

  return result.value;
}

export async function findByUserId(userId) {
  return db
    .collection('records')
    .find({ userId: ObjectId(userId) })
    .toArray();
}
