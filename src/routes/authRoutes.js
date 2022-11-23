import { Router } from 'express';
import authController from '../controllers/authController.js';
import validateSchema from '../middlewares/validateSchema.js';
import signInSchema from '../schemas/signInSchema.js';
import signUpSchema from '../schemas/signUpSchema.js';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  authController.signUp
);
authRouter.post(
  '/sign-in',
  validateSchema(signInSchema),
  authController.signIn
);

export default authRouter;
