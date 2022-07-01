import Joi from 'joi';
import bcrypt from 'bcrypt';

import httpStatus from '../utils/httpStatus.js';
import db from '../database/mongo.js';

async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  });

  const validation = schema.validate(
    { name, email, password, confirmPassword },
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

  if (user) {
    res.sendStatus(httpStatus.CONFLICT);
    return;
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
  });

  res.sendStatus(httpStatus.CREATED);
}

export default { signUp };
