import { Request, Response, NextFunction } from 'express';
import { HandleError } from '@modules/exceptions/dtos/handle-error';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const handleError = new HandleError(err);
    handleError.send(res);
}

export default errorHandler;
