import { notFoundError } from '../errors/httpErrors.js';
import create, {
  deleteById,
  updateById,
} from '../repositories/recordRepository.js';
import { findById, incrementBalance } from '../repositories/userRepository.js';

async function createRecord({ value, description, type, userId }) {
  await create({ value, description, type, userId });

  const valueToSum = type === 'input' ? value : toNegative(value);

  await incrementBalance(userId, valueToSum);

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

export async function updateRecordById(recordId, { value, description }) {
  const result = await updateById(recordId, { value, description });

  if (!result.value) {
    throw notFoundError('Could not find the specified record');
  }
}

export function sumRecordsValues(records) {
  const INITIAL_TOTAL = 0;

  return records.reduce(
    (totalValue, { value, type }) =>
      type === 'input' ? totalValue + value : totalValue - value,
    INITIAL_TOTAL
  );
}

export default createRecord;
