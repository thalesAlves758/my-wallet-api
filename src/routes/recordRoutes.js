import express from 'express';
import {
  getRecords,
  createRecord,
  deleteRecord,
  updateRecord,
} from '../controllers/recordController.js';
import validateToken from '../middlewares/validateToken.js';
import validateSchema from '../middlewares/validateSchema.js';
import recordSchema from '../schemas/recordSchema.js';
import updateRecordSchema from '../schemas/updateRecordSchema.js';

const router = express.Router();

router.get('/', validateToken, getRecords);
router.post('/', validateToken, validateSchema(recordSchema), createRecord);
router.delete('/:recordId', validateToken, deleteRecord);
router.put(
  '/:recordId',
  validateToken,
  validateSchema(updateRecordSchema),
  updateRecord
);

export default router;
