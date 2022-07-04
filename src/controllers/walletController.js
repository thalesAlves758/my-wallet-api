import db from '../database/mongo.js';
import httpStatus from '../utils/httpStatus.js';

async function getWallet(req, res) {
  const DESC = -1;

  const { user } = res.locals;

  try {
    const wallet = await db
      .collection('wallets')
      .findOne({ user_id: user._id });

    if (!wallet) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const cashFlow = await db
      .collection('cashFlows')
      .find({ wallet_id: wallet._id })
      .sort({ _id: DESC })
      .toArray();

    res.send({ balance: wallet.balance, cashFlow });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default { getWallet };
