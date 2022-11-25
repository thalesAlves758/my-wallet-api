import { Router } from 'express';

import authRoutes from './authRoutes.js';
import recordRoutes from './recordRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/records', recordRoutes);

export default router;
