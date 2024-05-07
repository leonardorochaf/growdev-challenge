import paths from './paths';
import * as schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Growdev Challenge API',
    description: 'API para o desafio backend da Growdev',
    version: '1.0.0',
  },
  servers: [{
    url: 'http://localhost:3000/api',
    description: 'Local server',
  }],
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'Students',
    },
  ],
  paths,
  schemas: {
    ...schemas,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
