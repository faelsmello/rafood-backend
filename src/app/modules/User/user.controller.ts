import { Router, Request, Response, NextFunction } from "express";
import UserService from "./user.service";

class UserRouterClass {
  public router: Router;

  constructor(public userService: UserService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.getUser.bind(this));
    this.router.get("/:id", this.getUserById.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }

  private async getUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      response.json(users);
    } catch (error) {
      next(error);
    }
  }

  private async getUserById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(request.params.id);
      response.json(user);
    } catch (error) {
      next(error);
    }
  }

  private async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.createUser(request.body);
      response.json(user);
    } catch (error) {
      next(error);
    }
  }
}

const userService = new UserService();
const userRouter = new UserRouterClass(userService).router;
export default userRouter;
