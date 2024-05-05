export class UnprocessableEntityError extends Error {
  statusCode = 422;

  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}
