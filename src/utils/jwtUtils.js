import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function generateToken(payload) {
  const { JWT_SECRET } = process.env;

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export default generateToken;
