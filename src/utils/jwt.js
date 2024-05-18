import 'dotenv/config';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export default {
  sign: (payload) => jwt.sign(payload, SECRET, { expiresIn: '24h', algorithm: 'HS256' }),

  verify: (token) => jwt.verify(token, SECRET),
};
