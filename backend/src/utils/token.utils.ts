/* eslint-disable max-len */
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { UnauthorizedError } from '../errors/unauthoraized.error';

export const generateToken = async (payload: any): Promise<string> => jwt.sign(payload, env.TOKEN.SECRET, { expiresIn: '1d' });

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, env.TOKEN.SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expirado');
    }
    throw error;
  }
};
