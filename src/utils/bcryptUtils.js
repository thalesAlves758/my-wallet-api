import bcrypt from 'bcrypt';

export function encryptText(text) {
  const saltRounds = 10;

  return bcrypt.hashSync(text, saltRounds);
}

export function compareTexts(encryptedText, text) {
  return bcrypt.compareSync(text, encryptedText);
}

export default encryptText;
