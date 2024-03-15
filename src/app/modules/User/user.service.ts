import { Password } from './../../../util/password';
import { Model } from 'mongoose';
import { IUserModel, UserModel } from './user.model';
import { UserInsertDto } from './dtos/user-insert.dto';
import { NotFoundError } from '../exceptions/not-found.exception';
import { BadRequesError } from '../exceptions/bad-request.exception';
import { UserResponseDto } from './dtos/user-response.dto';

class UserService {
    private userModel: Model<IUserModel>;
    private passwordUtil: Password;

    constructor() {
        this.passwordUtil = new Password();
        this.userModel = UserModel;
    }

    public async getUsers(): Promise<Array<IUserModel>> {
        return await this.userModel.find();
    }

    public async createUser(userBody: UserInsertDto): Promise<IUserModel> {
        try {
            const email = await this.getFindIsExist('email', userBody.email).catch(() => undefined);
            const cpf = await this.getFindIsExist('cpf', userBody.cpf).catch(() => undefined);

            if (email) {
                throw new Error('Email exist in DB');
            }

            if (cpf) {
                throw new Error('Email exist in DB');
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

    public async getUserById(userId: string): Promise<IUserModel> {
        const user = await this.userModel.findById(userId);

        try {
            if (!user) {
                throw new Error('User not Found');
            }
        } catch (e) {
            throw new NotFoundError(e as string);
        }

        return user;
    }

    public async getFindIsExist(type: string, value: string): Promise<IUserModel> {
        const obj: { [keyof: string]: unknown } = {};
        obj[type] = value;

        const user = await this.userModel.findOne(obj);

        if (!user) {
            throw new NotFoundError('User Not Found');
        }

        return user;
    }

    public async updateUser(userId: string, userData: Partial<IUserModel>): Promise<IUserModel> {
        const user = await this.userModel.findByIdAndUpdate(userId, userData, { new: true }).exec();

        try {
            if (!user) {
                throw new Error('User not Found');
            }
        } catch (e) {
            throw new BadRequesError(e as string);
        }

        return user;
    }

    public async deleteUser(userId: string): Promise<void> {
        try {
            const user = await this.userModel.findByIdAndDelete(userId).exec();
            if (!user) {
                throw new Error('User not Found');
            }
        } catch (e) {
            throw new BadRequesError(e as string);
        }
    }
}

export default UserService;
