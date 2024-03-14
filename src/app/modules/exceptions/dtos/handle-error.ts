import { Response } from "express";
import { AppExceptions } from "./../app.exception";

export class HandleError {
  public message: string;
  public erroCode!: number;

  constructor(error: Error) {
    this.message = error.message;

    if (error instanceof AppExceptions) {
      this.erroCode = error.errorCode;
    }
  }

  public send(res: Response): void {
    res.status(this.erroCode || 500).json(this);
  }
}
