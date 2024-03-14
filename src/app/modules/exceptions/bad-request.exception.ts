import { AppExceptions } from "./app.exception";

export class BadRequesError extends AppExceptions {
  constructor(message = "Bad Request", errorCode = 400) {
    super(message, errorCode);
  }
}
