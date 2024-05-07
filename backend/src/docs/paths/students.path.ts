export const StudentPath = {
  post: {
    tags: ['Students'],
    summary: 'Create a student',
    description: 'Create a student',
    security: [{
      bearerAuth: [],
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/CreateStudentInput',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Student created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/Student',
            },
            example: {
              id: 1,
              name: 'John Doe',
              email: 'johndoe@email.com',
              ra: '123456',
              cpf: '12345678901',
              createdAt: '2021-01-01T00:00:00.000Z',
              deletedAt: null,
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
                  name: ['Name is required'],
                },
              ],
            },
          },
        },
      },
      422: {
        description: 'Student with RA already exists',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Email is already in use',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
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
  get: {
    tags: ['Students'],
    summary: 'List all students',
    description: 'List all students',
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        in: 'query',
        name: 'filter',
        required: false,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'page',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Students listed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/ListStudentsOutput',
            },
            example: {
              students: [
                {
                  id: 1,
                  name: 'John Doe',
                  email: 'johndoe@email.com',
                  ra: '123456',
                  cpf: '12345678901',
                  createdAt: '2021-01-01T00:00:00.000Z',
                  deletedAt: null,
                },
              ],
              totalPages: 1,
              total: 1,
              currentPage: 1,
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
                  page: ['Page is required'],
                },
              ],
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
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

export const StudentPathId = {
  get: {
    tags: ['Students'],
    summary: 'Get student by id',
    description: 'Get student by id',
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Student retrieved',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/Student',
            },
            example: {
              id: 1,
              name: 'John Doe',
              email: 'johndoe@email.com',
              ra: '123456',
              cpf: '12345678901',
              createdAt: '2021-01-01T00:00:00.000Z',
              deletedAt: null,
            },
          },
        },
      },
      404: {
        description: 'Student not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Estudante não encontrado',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
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
  put: {
    tags: ['Students'],
    summary: 'Update a student',
    description: 'Update a student',
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/UpdateStudentInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Student updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/Student',
            },
            example: {
              id: 1,
              name: 'John Doe',
              email: 'johndoe@email.com',
              ra: '123456',
              cpf: '12345678901',
              createdAt: '2021-01-01T00:00:00.000Z',
              deletedAt: null,
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
                  email: ['Invalid email'],
                },
              ],
            },
          },
        },
      },
      404: {
        description: 'Student not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Estudante não encontrado',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
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
  delete: {
    tags: ['Students'],
    summary: 'Delete a student',
    description: 'Delete a student',
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      204: {
        description: 'Student deleted',
      },
      404: {
        description: 'Student not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/BaseErrorResponse',
            },
            example: {
              error: 'Estudante não encontrado',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
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
