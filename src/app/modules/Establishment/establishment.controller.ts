import { NextFunction, Router, Request, Response } from 'express';
import EstablishmentService from './establishment.service';

class EstablishmentController {
    public router: Router;

    constructor(private establishmentService: EstablishmentService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.createEstablishment.bind(this));
    }

    private async createEstablishment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = await establishmentService.createEstablishment(request.body);
            response.json(user);
        } catch (error) {
            next(error);
        }
    }
}

const establishmentService = new EstablishmentService();
const establishmentRouter = new EstablishmentController(establishmentService).router;
export default establishmentRouter;
