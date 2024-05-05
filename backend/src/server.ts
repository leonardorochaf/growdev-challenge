import { AppDataSource } from './database/datasource';
import { DbConnection } from './database/connection';
import { env } from './config/env';

DbConnection.getInstance().connect(AppDataSource).then(async () => {
  const app = (await import('./app')).default;

  app.listen(env.APP.PORT, () => {
    console.log(`Server running on port ${env.APP.PORT}`);
  });
});
