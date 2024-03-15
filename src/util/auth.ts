import { NextFunction } from 'express';
import { IUserModel } from '@src/app/modules/User/user.model';
import { UnauthorizedError } from '@src/app/modules/exceptions/unauthorized.exception';
import { sign, verify } from 'jsonwebtoken';

const PASSWORD_JWT = process.env.PASSWORD_JWT as string;
export const generateToken = (user: IUserModel): string => {
    return sign(
        {
            userId: user.id,
            name: user.name,
        },
        PASSWORD_JWT,
        {
            subject: String(user.id),
            expiresIn: '604800000',
        },
    );
};

export const verifyToken = async (authorization: string, next: NextFunction): Promise<any> => {
    try {
        if (!authorization) throw new UnauthorizedError();

        const [, token] = authorization.split(' ');
        const decodeToken = verify(token, PASSWORD_JWT);
        return decodeToken;
    } catch (err) {
        next(err);
    }
};
