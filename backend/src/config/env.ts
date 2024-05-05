export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  APP: {
    PORT: process.env.APP_PORT ?? '3000',
  },
  POSTGRES: {
    HOST: process.env.POSTGRES_HOST ?? 'localhost',
    PORT: +process.env.POSTGRES_PORT! ?? 5432,
    USER: process.env.POSTGRES_USER ?? 'docker',
    PASSWORD: process.env.POSTGRES_PASSWORD ?? 'admin',
    DB_NAME: process.env.POSTGRES_DB_NAME ?? 'docker',
  },
};
