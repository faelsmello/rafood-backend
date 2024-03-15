import { Router, Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { UserResponseDto } from './dtos/user-response.dto';

class UserRouterClass {
    public router: Router;

    constructor(public userService: UserService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.getUser.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.put('/:id', this.updateUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }

    private async getUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const users = (await this.userService.getUsers()).map((user) => new UserResponseDto(user));
            response.json(users);
        } catch (error) {
            next(error);
        }
    }

    private async getUserById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = new UserResponseDto(await this.userService.getUserById(request.params.id));
            response.json(user);
        } catch (error) {
            next(error);
        }
    }

    private async createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = new UserResponseDto(await userService.createUser(request.body));
            response.json(user);
        } catch (error) {
            next(error);
        }
    }

    private async updateUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = new UserResponseDto(await this.userService.updateUser(request.params.id, request.body));
            response.json(user);
        } catch (error) {
            next(error);
        }
    }

    private async deleteUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.userService.deleteUser(request.params.id);
            response.status(204);
            response.json();
        } catch (error) {
            next(error);
        }
    }
}

const userService = new UserService();
const userRouter = new UserRouterClass(userService).router;
export default userRouter;
