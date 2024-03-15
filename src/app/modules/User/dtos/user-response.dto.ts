import { IUserModel } from '../user.model';

export class UserResponseDto {
    id: string;
    name: string;
    email: string;
    cpf: string;

    constructor(user: IUserModel) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.cpf = user.cpf;
    }
}
