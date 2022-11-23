import { conflictError, unauthorizedError } from '../errors/httpErrors.js';
import {
  create,
  findByEmail,
  findById,
} from '../repositories/userRepository.js';
import { encryptText, compareTexts } from '../utils/bcryptUtils.js';
import generateToken, { decodeAndVerifyToken } from '../utils/jwtUtils.js';

export async function signUpUser({ name, email, password }) {
  await validateUserNotExists(email);

  const encryptedPassword = encryptText(password);

  create({ email, name, password: encryptedPassword });
}

export async function validateUserNotExists(email) {
  const user = await findByEmail(email);

  if (user) {
    throw conflictError('An user with this email already exists');
  }
}

export async function signInUser({ email, password }) {
  const user = await validateUserExists(email);
  validateUserPassword(user.password, password);

  const token = generateToken({ userId: user._id });

  delete user.password;

  return {
    ...user,
    token,
  };
}

export async function validateUserExists(email) {
  const user = await findByEmail(email);

  if (!user) {
    throw unauthorizedError('Incorrect email or password');
  }

  return user;
}

export function validateUserPassword(encryptedPassword, bodyPassword) {
  const result = compareTexts(encryptedPassword, bodyPassword);

  if (!result) {
    throw unauthorizedError('Incorrect email or password');
  }
}

export async function getUserByToken(token) {
  const { userId } = validateToken(token);

  const user = await findById(userId);

  delete user.password;

  return user;
}

function validateToken(token) {
  const result = decodeAndVerifyToken(token);

  if (!result) {
    throw unauthorizedError();
  }

  return result;
}
