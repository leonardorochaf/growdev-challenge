export const LoginInput = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['username', 'password'],
};

export const LoginOutput = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
  required: ['token'],
};
