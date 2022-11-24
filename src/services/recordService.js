import create from '../repositories/recordRepository.js';
import {
  findById,
  updateWalletBalance,
} from '../repositories/userRepository.js';

async function createRecord({ value, description, type, userId }) {
  await create({ value, description, type, userId });

  const valueToSum = type === 'input' ? value : toNegative(value);

  await updateWalletBalance(userId, valueToSum);

  const user = await findById(userId);

  return {
    balance: user.wallet.balance,
  };
}

function toNegative(value) {
  const MINUS_ONE = -1;

  return MINUS_ONE * Math.abs(value);
}

export default createRecord;
