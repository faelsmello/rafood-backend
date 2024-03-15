import 'dotenv/config';
import './util/module-alias';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import router from './routes';
import mongoose from 'mongoose';
import ErrorHandler from './app/middlewares/error.middleware';
import authorizationMiddleware from './app/middlewares/authorization.middleware';

export class SetupApplication {
    private server?: Server;
    private connectString = process.env.CONNECT_STRING as string;

    constructor(
        private port = 3000,
        public app = express(),
    ) {}

    public initDB() {
        mongoose
            .connect(this.connectString)
            .then(() => {
                this.init();
                this.start();
            })
            .catch((e) => console.log(e));
    }

    public init(): void {
        this.setupExpress();
        this.setupRoutes();
    }

    public start(): void {
        this.app.use(ErrorHandler);

        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    private setupRoutes(): void {
        this.app.use(router);
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}
