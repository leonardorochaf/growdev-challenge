export const BaseErrorResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
  },
};

export const BaseValidationErrorResponse = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
