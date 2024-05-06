/* eslint-disable max-len */
import bcrypt from 'bcrypt';

export const validatePassword = async (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);
