import express from 'express';
import {
  createRecord,
  deleteRecord,
  updateRecord,
} from '../controllers/recordController.js';
import validateToken from '../middlewares/validateToken.js';
import validateSchema from '../middlewares/validateSchema.js';
import recordSchema from '../schemas/recordSchema.js';

const router = express.Router();

router.post('/', validateToken, validateSchema(recordSchema), createRecord);
router.delete('/records/:recordId', validateToken, deleteRecord);
router.put('/records/:recordId', validateToken, updateRecord);

export default router;
