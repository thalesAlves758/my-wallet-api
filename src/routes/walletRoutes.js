import express from 'express';

import getWallet from '../controllers/walletController.js';
import validateToken from '../middlewares/validateToken.js';

const router = express.Router();

router.get('/', validateToken, getWallet);

export default router;
