import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { Validator } from './validator';

jest.mock('../log/logger');

describe('Validator', () => {
  let mockSchema: ZodSchema;
  let request: Request;
  let response: Response;
  let descriptor: PropertyDescriptor;

  beforeEach(() => {
    mockSchema = {
      safeParse: jest.fn(() => ({ success: true })),
    } as unknown as ZodSchema;
    request = {} as Request;
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    descriptor = {
      value: jest.fn(),
    };
  });

  it('should return a function', () => {
    const result = Validator(mockSchema);
    expect(typeof result).toBe('function');
  });

  it('should call the original method if the data is valid', async () => {
    const result = Validator(mockSchema);
    const originalMethod = descriptor.value;

    const newDescriptor = result({}, 'test', descriptor);
    await newDescriptor.value(request, response);

    expect(originalMethod).toHaveBeenCalled();
  });

  it('should return a 400 status if the data is invalid', async () => {
    mockSchema = {
      safeParse: jest.fn(() => ({ success: false, error: { flatten: jest.fn(() => ({ fieldErrors: { test: 'Test error' } })) } })),
    } as unknown as ZodSchema;

    const result = Validator(mockSchema);
    const newDescriptor = result({}, 'test', descriptor);
    await newDescriptor.value(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('should return a 500 status if an error occurs', async () => {
    mockSchema = {
      safeParse: jest.fn(() => { throw new Error('Test error'); }),
    } as unknown as ZodSchema;

    const result = Validator(mockSchema);
    const newDescriptor = result({}, 'test', descriptor);
    await newDescriptor.value(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
  });
});
