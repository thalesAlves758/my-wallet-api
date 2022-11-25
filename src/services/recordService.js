import { notFoundError } from '../errors/httpErrors.js';
import create, { deleteById } from '../repositories/recordRepository.js';
import { findById, updateBalance } from '../repositories/userRepository.js';

async function createRecord({ value, description, type, userId }) {
  await create({ value, description, type, userId });

  const valueToSum = type === 'input' ? value : toNegative(value);

  await updateBalance(userId, valueToSum);

  const user = await findById(userId);

  return {
    balance: user.balance,
  };
}

function toNegative(value) {
  const MINUS_ONE = -1;

  return MINUS_ONE * Math.abs(value);
}

export async function deleteRecordById(recordId) {
  const result = await deleteById(recordId);

  if (!result.value) {
    throw notFoundError('Could not find the specified record');
  }
}

export default createRecord;
