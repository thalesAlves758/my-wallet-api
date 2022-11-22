import { Router } from 'express';
import authController from '../controllers/authController.js';
import validateSchema from '../middlewares/validateSchema.js';
import validateUser from '../middlewares/validateUser.js';
import signUpSchema from '../schemas/signUpSchema.js';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  authController.signUp
);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/sign-out', validateUser, authController.signOut);

export default authRouter;
