import { findByUserId } from '../repositories/recordRepository.js';
import { findById, updateBalance } from '../repositories/userRepository.js';
import { sumRecordsValues } from './recordService.js';

async function updateUserBalance(userId) {
  const records = await findByUserId(userId);

  const totalValue = sumRecordsValues(records);

  await updateBalance(userId, totalValue);

  const user = await findById(userId);

  return {
    balance: user.balance,
  };
}

export default updateUserBalance;
