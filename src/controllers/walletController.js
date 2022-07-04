import Joi from 'joi';

import db from '../database/mongo.js';
import httpStatus from '../utils/httpStatus.js';

async function getWalletByUserId(userId) {
  return db.collection('wallets').findOne({ user_id: userId });
}

async function getCashFlowByWalletId(walletId) {
  const DESC = -1;

  return db
    .collection('cashFlows')
    .find({ wallet_id: walletId })
    .sort({ _id: DESC })
    .toArray();
}

function toNegative(value) {
  const MINUS_ONE = -1;

  return MINUS_ONE * Math.abs(value);
}

async function getWallet(req, res) {
  const { user } = res.locals;

  try {
    const wallet = await getWalletByUserId(user._id);

    if (!wallet) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const cashFlow = await getCashFlowByWalletId(wallet._id);

    res.send({ balance: wallet.balance, cashFlow });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createRecord(req, res) {
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

    const cashFlow = await getCashFlowByWalletId(wallet._id);

    res.status(httpStatus.CREATED).send({ balance: newBalance, cashFlow });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default { getWallet, createRecord };
