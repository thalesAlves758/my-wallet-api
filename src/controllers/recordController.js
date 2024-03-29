import httpStatus from '../utils/httpStatus.js';
import {
  createRecord as newRecord,
  deleteRecordById,
  findRecordsByUserId,
  updateRecordById,
} from '../services/recordService.js';
import updateUserBalance from '../services/userService.js';

export async function getRecords(req, res) {
  const { user } = res.locals;

  const result = await findRecordsByUserId(user._id);

  res.send(result);
}

export async function createRecord(req, res) {
  const { user } = res.locals;

  const { value, description, type } = req.body;

  await newRecord({
    value,
    description,
    type,
    userId: user._id,
  });

  const result = await updateUserBalance(user._id);

  res.status(httpStatus.CREATED).send(result);
}

export async function deleteRecord(req, res) {
  const { user } = res.locals;
  const { recordId } = req.params;

  await deleteRecordById(recordId, user._id);
  const result = await updateUserBalance(user._id);

  res.status(httpStatus.OK).send(result);
}

export async function updateRecord(req, res) {
  const { user } = res.locals;
  const { recordId } = req.params;
  const { value, description } = req.body;

  await updateRecordById(recordId, user._id, { value, description });
  const result = await updateUserBalance(user._id);

  res.status(httpStatus.OK).send(result);
}
