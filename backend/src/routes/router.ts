import swaggerUi from 'swagger-ui-express';
import { Express, Router } from 'express';
import { readdirSync } from 'fs';

import swaggerConfig from '../docs/swagger-config';

export const initRoutes = (app: Express) => {
  const router = Router();
  readdirSync(__dirname)
    .filter((file) => !file.endsWith('.map') && !file.endsWith('.test.ts') && file !== 'router.js' && file !== 'router.ts')
    .map(async (file) => {
      (await import(`../routes/${file}`)).default(router);
    });

  app.use('/api', router);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
};
