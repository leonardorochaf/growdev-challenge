import { DataSource } from 'typeorm';

import { env } from '../config/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES.HOST,
  port: env.POSTGRES.PORT,
  username: env.POSTGRES.USER,
  password: env.POSTGRES.PASSWORD,
  database: env.POSTGRES.DB_NAME,
  entities: ['src/database/models/*.{js,ts}'],
});
