import { IUserModel } from '../User/user.model';

export class AuthModel {
    token: string;
    user: IUserModel;

    constructor(token: string, user: IUserModel) {
        this.token = token;
        this.user = user;
    }
}
