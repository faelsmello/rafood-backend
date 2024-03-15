import { AuthDto } from './dtos/auth.dtos';
import { UnauthorizedError } from '@modules/exceptions/unauthorized.exception';
import { AuthModel } from './auth.model';
import { generateToken } from '@src/util/auth';
import { IUserModel } from '@modules/User/user.model';
import { Password } from '@src/util/password';
import UserService from '@modules/User/user.service';
import { UserInsertDto } from '../User/dtos/user-insert.dto';

class AuthService {
    private passwordUtil: Password;
    private userService: UserService;

    constructor() {
        this.passwordUtil = new Password();
        this.userService = new UserService();
    }

    public async validateAuth(auth: AuthDto) {
        const user = (await this.userService.getFindIsExist('email', auth.email)) as IUserModel;
        const isValidPassword = await this.passwordUtil.validatePassword(auth.password, user.password);

        if (!isValidPassword) throw new UnauthorizedError('User');

        return new AuthModel(generateToken(user), user);
    }

    public async createUser(body: UserInsertDto): Promise<IUserModel> {
        return this.userService.createUser(body);
    }
}

export default AuthService;
