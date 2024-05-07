export const Student = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    ra: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
    },
  },
};

export const CreateStudentInput = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    ra: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
  },
  required: ['name', 'email', 'ra', 'cpf'],
};

export const ListStudentsOutput = {
  type: 'object',
  properties: {
    students: {
      type: 'array',
      items: {
        $ref: '#/schemas/Student',
      },
    },
    totalPages: {
      type: 'number',
    },
    total: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
  },
};

export const UpdateStudentInput = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
};
