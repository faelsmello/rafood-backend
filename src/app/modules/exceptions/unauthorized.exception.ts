import { AppExceptions } from './app.exception';

export class UnauthorizedError extends AppExceptions {
    constructor(message = 'User without permission', errorCode = 401) {
        super(message, errorCode);
    }
}
