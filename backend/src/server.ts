import { AppDataSource } from './database/datasource';
import { DbConnection } from './database/connection';
import { env } from './config/env';
import logger from './log/logger';

DbConnection.getInstance().connect(AppDataSource).then(async () => {
  const app = (await import('./app')).default;

  app.listen(env.APP.PORT, () => {
    logger.info(`Server running on port ${env.APP.PORT}`);
  });
});
