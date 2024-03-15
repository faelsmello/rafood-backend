import { Router } from 'express';
import productRouter from '@modules/Product/product.controller';
import userRouter from '@modules/User/user.controller';
import authRouter from '@modules/Auth/auth.controller';
import establishmentRoute from '@modules/Establishment/establishment.controller';
import authorizationMiddleware from './app/middlewares/authorization.middleware';

class Routes {
    static define(router: Router): Router {
        router.use('/auth', authRouter);

        router.use(authorizationMiddleware);
        router.use('/product', productRouter);
        router.use('/user', userRouter);
        router.use('/establishment', establishmentRoute);

        return router;
    }
}

export default Routes.define(Router());
