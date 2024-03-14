export class AppExceptions extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
    // this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
  }
}
