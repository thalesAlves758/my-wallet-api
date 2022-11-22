import Joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import httpStatus from '../utils/httpStatus.js';
import db from '../database/mongo.js';
import { signUpUser } from '../services/authService.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  await signUpUser({ name, email, password });

  res.sendStatus(httpStatus.CREATED);
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(
    {
      email,
      password,
    },
    { abortEarly: false }
  );

  if (validation.error) {
    const error = {};

    validation.error.details.forEach(({ path, message }) => {
      error[path] = message;
    });

    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error });
    return;
  }

  const user = await db.collection('users').findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .send({ error: 'Incorrect email or password' });

    return;
  }

  const thisSession = {
    token: uuid(),
    user_id: user._id,
  };

  await db.collection('sessions').insertOne(thisSession);

  res.locals.session = thisSession.token;
  res.send({ token: thisSession.token, email: user.email, name: user.name });
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
