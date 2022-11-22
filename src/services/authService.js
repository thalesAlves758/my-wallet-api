import { conflictError } from '../errors/httpErrors.js';
import { create, findByEmail } from '../repositories/userRepository.js';
import encryptText from '../utils/bcryptUtils.js';

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
