export const LoginPath = {
  post: {
    tags: ['Auth'],
    summary: 'Authenticate user',
    description: 'Authenticate user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/LoginInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/LoginOutput',
            },
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1MDQxNjkxLCJleHAiOjE3MTUxMjgwOTF9.iXFUC5X3bhPJ-TbXNRhfqdUeWGhP8HYLnM3Sz9ecOec',
            },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseValidationErrorResponse',
            },
            example: {
              errors: [
                {
                  email: ['Email is required'],
                },
                {
                  password: ['Password is required'],
                },
              ],
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Credenciais inválidas',
            },
          },
        },
      },
      403: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Usuário não possui permissão para acessar este recurso',
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Não foi possível processar sua solicitação',
            },
          },
        },
      },
    },
  },
};
