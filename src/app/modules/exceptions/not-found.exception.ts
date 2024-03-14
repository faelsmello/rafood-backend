import { AppExceptions } from "./app.exception";

export class NotFoundError extends AppExceptions {
  constructor(message = "Not Found", errorCode = 404) {
    super(message, errorCode);
  }
}
