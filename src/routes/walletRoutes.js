import express from 'express';

import walletController from '../controllers/walletController.js';
import validateUser from '../middlewares/validateUser.js';

const router = express.Router();

router.get('/wallet', validateUser, walletController.getWallet);
router.post('/wallet/new-input', validateUser, walletController.createInput);

export default router;
