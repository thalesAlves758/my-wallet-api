import httpStatus from '../utils/httpStatus.js';
import newRecord, {
  deleteRecordById,
  updateRecordById,
} from '../services/recordService.js';
import updateUserBalance from '../services/userService.js';

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

  await deleteRecordById(recordId);
  const result = await updateUserBalance(user._id);

  res.status(httpStatus.OK).send(result);
}

export async function updateRecord(req, res) {
  const { user } = res.locals;
  const { recordId } = req.params;
  const { value, description } = req.body;

  await updateRecordById(recordId, { value, description });
  const result = await updateUserBalance(user._id);

  res.status(httpStatus.OK).send(result);
}
