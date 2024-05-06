/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { z } from 'zod';

function validateCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (parseInt(cpf.charAt(9), 10) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (parseInt(cpf.charAt(10), 10) !== digit) return false;

  return true;
}

function validateNumericString(value: string) {
  return /^\d+$/.test(value);
}

export const createStudentSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  ra: z.string().min(6).max(6).refine((value) => validateNumericString(value), {
    message: 'RA must contain only numbers',
  }),
  cpf: z.string().refine((cpf) => validateCPF(cpf), { message: 'Invalid cpf format' }),
}).required();

export const listStudentsSchema = z.object({
  filter: z.string().optional(),
  page: z.string().refine((value) => validateNumericString(value), {
    message: 'Page must contain only numbers',
  }),
});

export const updateStudentSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
});
