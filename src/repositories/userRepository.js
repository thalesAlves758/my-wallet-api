import db from '../database/mongo.js';

export async function findByEmail(email) {
  return db.collection('users').findOne({ email });
}

export async function create({ email, name, password }) {
  return db.collection('users').insertOne({
    name,
    email,
    password,
    wallet: { balance: 0 },
  });
}
