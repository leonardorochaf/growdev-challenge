/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';

import logger from '../log/logger';

export function Validator(schema: ZodSchema): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const request: Request = args[0];
      const response: Response = args[1];

      try {
        const routeData = { ...request.body, ...request.params, ...request.query };
        logger.info(routeData, `Validating data for route ${request.originalUrl}`);
        const result = schema.safeParse(routeData);

        if (result.success) {
          logger.info('Data validated successfully');
          return originalMethod.apply(this, args);
        }

        const validationErrors = result.error.flatten().fieldErrors;

        logger.error(validationErrors, 'Validation error');
        return response.status(400).json({ errors: validationErrors });
      } catch (error) {
        logger.error(error, 'Error validating data');
        return response.status(500).json({ error: 'Houve um erro ao processar a requisição' });
      }
    };
    return descriptor;
  };
}
