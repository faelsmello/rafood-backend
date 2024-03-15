import { Password } from '@src/util/password';
import { Request, Response, NextFunction } from 'express';
import AuthService from '@modules/Auth/auth.service';
import { verifyToken } from '@src/util/auth';
import { UnauthorizedError } from '../modules/exceptions/unauthorized.exception';

function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new UnauthorizedError();
        }

        verifyToken(authorization, next);
        next();
    } catch (err) {
        next(err);
    }
}

export default authorizationMiddleware;
