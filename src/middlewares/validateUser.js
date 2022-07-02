import db from '../database/mongo.js';
import httpStatus from '../utils/httpStatus.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    const user = await db.collection('users').findOne({ _id: session.user_id });

    if (!user) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    delete user.password;

    res.locals.user = user;

    next();
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default validateUser;
