import jwt from 'jsonwebtoken';

import { env } from '../config/env';

export const generateToken = async (payload: any): Promise<string> => jwt.sign(payload, env.TOKEN.SECRET, { expiresIn: '1d' });
