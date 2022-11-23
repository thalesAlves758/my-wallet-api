import { notFoundError, unauthorizedError } from '../errors/httpErrors.js';
import { getUserByToken } from '../services/authService.js';

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    throw unauthorizedError('A token is required');
  }

  const user = await getUserByToken(token);

  if (!user) {
    throw notFoundError('Could not find specified user');
  }

  res.locals = { user };

  next();
}

export default validateToken;
