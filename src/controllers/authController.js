import httpStatus from '../utils/httpStatus.js';
import { signInUser, signUpUser } from '../services/authService.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  await signUpUser({ name, email, password });

  res.sendStatus(httpStatus.CREATED);
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const result = await signInUser({ email, password });

  res.send(result);
}

export default { signUp, signIn };
