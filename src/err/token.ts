export default class Unauthorized extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = 'unauthorizedError';
    this.code = 401;
  }
}