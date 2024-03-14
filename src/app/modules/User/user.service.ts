import { Password } from "./../../../util/password";
import mongoose, { Schema, Document } from "mongoose";
import { IUserModel } from "./user.model";
import { UserInsertDto } from "./dtos/user-insert.dto";
import { NotFoundError } from "../exceptions/not-found.exception";
import { BadRequesError } from "../exceptions/bad-request.exception";

class UserService {
  private userModel = mongoose.model<IUserModel>(
    "User",
    new Schema({
      name: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      cpf: { type: String, required: true, unique: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    })
  );
  private passwordUtil: Password;

  constructor() {
    this.passwordUtil = new Password();
  }

  public async getUsers(): Promise<Array<IUserModel>> {
    return await this.userModel.find();
  }

  public async createUser(userBody: UserInsertDto): Promise<UserInsertDto> {
    try {
      const email = await this.getFindIsExist("email", userBody.email).catch(
        () => undefined
      );
      const cpf = await this.getFindIsExist("cpf", userBody.cpf).catch(
        () => undefined
      );
      const name = await this.getFindIsExist("name", userBody.name).catch(
        () => undefined
      );

      if (name) {
        throw new Error("Name exist in DB");
      }

      if (email) {
        throw new Error("Email exist in DB");
      }

      if (cpf) {
        throw new Error("Email exist in DB");
      }
    } catch (e) {
      throw new BadRequesError(e as string);
    }

    const newUser = {
      ...userBody,
      password: await this.passwordUtil.createPasswordHashed(userBody.password),
    };

    const user = new this.userModel(newUser);
    return await user.save();
  }

  public async getUserById(userId: string): Promise<IUserModel | null> {
    return await this.userModel.findById(userId).exec();
  }

  public async getFindIsExist(
    type: string,
    value: string
  ): Promise<IUserModel | null> {
    const obj: { [keyof: string]: unknown } = {};
    obj[type] = value;

    const query = this.userModel.where(obj);
    const user = await query.findOne().exec();

    if (!user) {
      throw new NotFoundError("User");
    }

    return user;
  }

  public async updateUser(
    userId: string,
    userData: Partial<IUserModel>
  ): Promise<IUserModel | null> {
    return await this.userModel
      .findByIdAndUpdate(userId, userData, { new: true })
      .exec();
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}

export default UserService;
