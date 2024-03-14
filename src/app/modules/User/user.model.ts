import { Document } from "mongoose";

export interface IUserModel extends Document {
  name: string;
  password: string;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
}
