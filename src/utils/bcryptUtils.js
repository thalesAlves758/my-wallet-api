import bcrypt from 'bcrypt';

function encryptText(text) {
  const saltRounds = 10;

  return bcrypt.hashSync(text, saltRounds);
}

export default encryptText;
