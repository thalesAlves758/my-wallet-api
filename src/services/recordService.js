import { notFoundError } from '../errors/httpErrors.js';
import {
  create,
  deleteById,
  findByUserId,
  updateById,
} from '../repositories/recordRepository.js';

export async function createRecord({ value, description, type, userId }) {
  await create({ value, description, type, userId });
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

export async function findRecordsByUserId(userId) {
  return findByUserId(userId);
}
