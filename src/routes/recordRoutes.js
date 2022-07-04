import express from 'express';
import recordController from '../controllers/recordController.js';
import validateUser from '../middlewares/validateUser.js';

const router = express.Router();

router.post('/records', validateUser, recordController.createRecord);
router.delete(
  '/records/:recordId',
  validateUser,
  recordController.deleteRecord
);
router.put('/records/:recordId', validateUser, recordController.updateRecord);

export default router;
