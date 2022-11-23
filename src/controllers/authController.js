import httpStatus from '../utils/httpStatus.js';
import db from '../database/mongo.js';
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

async function signOut(req, res) {
  const { session: currentSession } = res.locals;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (currentSession.token !== token) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }

  const session = await db.collection('sessions').findOneAndDelete({ token });

  if (!session) {
    res.sendStatus(httpStatus.NOT_FOUND);
    return;
  }

  res.sendStatus(httpStatus.NO_CONTENT);
}

export default { signUp, signIn, signOut };
