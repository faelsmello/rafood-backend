import { NextFunction, Router, Request, Response } from 'express';
import AuthService from './auth.service';
import { AuthDto } from './dtos/auth.dtos';
import { UserResponseDto } from '../User/dtos/user-response.dto';
import { UserInsertDto } from '../User/dtos/user-insert.dto';

class AuthController {
    public router: Router;

    constructor(private authService: AuthService) {
        this.router = Router();
        this.initializeRoutes();
    }

    public async authUser(req: Request<unknown, unknown, AuthDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.authService.validateAuth(req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    private initializeRoutes(): void {
        this.router.post('/', this.authUser.bind(this));
        this.router.post('/newUser', this.newUser.bind(this));
    }

    private async newUser(request: Request<unknown, unknown, UserInsertDto>, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = new UserResponseDto(await authService.createUser(request.body));
            response.json(user);
        } catch (error) {
            next(error);
        }
    }
}

const authService = new AuthService();
const authcontroller = new AuthController(authService).router;
export default authcontroller;
