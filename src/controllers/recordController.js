import Joi from 'joi';

import { ObjectId } from 'mongodb';
import httpStatus from '../utils/httpStatus.js';
import db from '../database/mongo.js';

function toNegative(value) {
  const MINUS_ONE = -1;

  return MINUS_ONE * Math.abs(value);
}

function getWalletByUserId(userId) {
  return db.collection('wallets').findOne({ user_id: userId });
}

async function createRecord(req, res) {
  const DESC = -1;
  const GREATER_THAN = 0;
  const DECIMALS_PLACES = 2;

  const { user } = res.locals;

  const { value, description, type } = req.body;

  const schema = Joi.object({
    value: Joi.number()
      .precision(DECIMALS_PLACES)
      .greater(GREATER_THAN)
      .required(),
    type: Joi.string().required().valid('input', 'output'),
    description: Joi.string().required(),
  });

  const validation = schema.validate(
    { value, description, type },
    { abortEarly: false, convert: false }
  );

  if (validation.error) {
    const error = {};

    validation.error.details.forEach(({ path, message }) => {
      error[path] = message;
    });

    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error });
    return;
  }

  try {
    const wallet = await getWalletByUserId(user._id);

    if (!wallet) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    await db.collection('cashFlows').insertOne({
      type,
      description,
      value,
      date: Date.now(),
      wallet_id: wallet._id,
    });

    const newBalance =
      wallet.balance + (type === 'output' ? toNegative(value) : value);

    await db
      .collection('wallets')
      .updateOne({ _id: wallet._id }, { $set: { balance: newBalance } });

    const cashFlow = await db
      .collection('cashFlows')
      .find({ wallet_id: wallet._id })
      .sort({ _id: DESC })
      .toArray();

    res.status(httpStatus.CREATED).send({ balance: newBalance, cashFlow });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteRecord(req, res) {
  const { user } = res.locals;

  const { recordId } = req.params;

  try {
    const wallet = await getWalletByUserId(user._id);

    if (!wallet) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const deletedRecord = await db
      .collection('cashFlows')
      .findOneAndDelete({ _id: ObjectId(recordId) });

    if (!deletedRecord.value) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const { type: recordType, value } = deletedRecord.value;

    const newWalletValue =
      wallet.balance + (recordType === 'input' ? toNegative(value) : value);

    await db
      .collection('wallets')
      .updateOne({ user_id: user._id }, { $set: { balance: newWalletValue } });

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default { createRecord, deleteRecord };
