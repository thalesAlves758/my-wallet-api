import express from 'express';
import authController from '../controllers/authController.js';
import validateUser from '../middlewares/validateUser.js';

const router = express.Router();

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.post('/sign-out', validateUser, authController.signOut);

export default router;
