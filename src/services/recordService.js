import { notFoundError } from '../errors/httpErrors.js';
import {
  create,
  deleteByIdAndUserId,
  findByUserId,
  updateByIdAndUserId,
} from '../repositories/recordRepository.js';

export async function createRecord({ value, description, type, userId }) {
  await create({ value, description, type, userId });
}

export async function deleteRecordById(recordId, userId) {
  const result = await deleteByIdAndUserId(recordId, userId);

  if (!result) {
    throw notFoundError('Could not find the specified record');
  }
}

export async function updateRecordById(
  recordId,
  userId,
  { value, description }
) {
  const result = await updateByIdAndUserId(recordId, userId, {
    value,
    description,
  });

  if (!result) {
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

export async function findRecordsByUserId(userId) {
  return findByUserId(userId);
}
