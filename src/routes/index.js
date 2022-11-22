import { Router } from 'express';

import authRoutes from './authRoutes.js';
import walletRoutes from './walletRoutes.js';
import recordRoutes from './recordRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/wallets', walletRoutes);
router.use('/records', recordRoutes);

export default router;
