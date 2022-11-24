import { ObjectId } from 'mongodb';
import httpStatus from '../utils/httpStatus.js';
import db from '../database/mongo.js';
import newRecord from '../services/recordService.js';

function toNegative(value) {
  const MINUS_ONE = -1;

  return MINUS_ONE * Math.abs(value);
}

function getWalletByUserId(userId) {
  return db.collection('wallets').findOne({ user_id: userId });
}

function getCashFlowByWalletId(walletId) {
  const DESC = -1;

  return db
    .collection('cashFlows')
    .find({ wallet_id: walletId })
    .sort({ _id: DESC })
    .toArray();
}

export async function createRecord(req, res) {
  const { user } = res.locals;

  const { value, description, type } = req.body;

  const result = await newRecord({
    value,
    description,
    type,
    userId: user._id,
  });

  res.status(httpStatus.CREATED).send(result);
}

export async function deleteRecord(req, res) {
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
      .findOneAndDelete({ _id: ObjectId(recordId), wallet_id: wallet._id });

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

export async function updateRecord(req, res) {
  const { user } = res.locals;
  const { recordId } = req.params;
  const { value, description } = req.body;

  try {
    const wallet = await getWalletByUserId(user._id);

    if (!wallet) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const oldRecord = await db
      .collection('cashFlows')
      .findOne({ _id: ObjectId(recordId), wallet_id: wallet._id });

    if (!oldRecord) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    await db
      .collection('cashFlows')
      .updateOne({ _id: ObjectId(recordId) }, { $set: { value, description } });

    const newWalletValue =
      wallet.balance +
      (oldRecord.type === 'input'
        ? toNegative(oldRecord.value) + value
        : oldRecord.value - value);

    await db
      .collection('wallets')
      .updateOne({ user_id: user._id }, { $set: { balance: newWalletValue } });

    const cashFlow = await getCashFlowByWalletId(wallet._id);

    res.send({ balance: newWalletValue, cashFlow });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
