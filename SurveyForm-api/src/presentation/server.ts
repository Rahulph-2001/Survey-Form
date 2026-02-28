// SurveyForm-api/src/presentation/server.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from '../config/env';
import { errorHandler } from './middlewares/errorHandlerMiddileware';
import { container } from '../infrastructure/di/container';
import { TYPES } from '../infrastructure/di/types';
import { SurveyRoutes } from './routes/survey/SurveyRoutes';
import { AdminRoutes } from './routes/admin/AdminRoutes';
import { surveySubmitLimiter } from './middlewares/rateLimiterMiddileware';
import { ROUTES } from '../config/routes';

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddlewares(): void {
        this.app.use(helmet());

        let corsOrigin = env.CORS_ORIGIN;
        if (corsOrigin.endsWith('/')) {
            corsOrigin = corsOrigin.slice(0, -1);
        }

        this.app.use(cors({
            origin: corsOrigin,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type'],
            credentials: true,
        }));

        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private setupRoutes(): void {
        const surveyRoutes = container.get<SurveyRoutes>(TYPES.SurveyRoutes);
        const adminRoutes = container.get<AdminRoutes>(TYPES.AdminRoutes);


        this.app.use(`${ROUTES.API_PREFIX}${ROUTES.SURVEY.BASE}`, surveyRoutes.router);
        this.app.use(`${ROUTES.API_PREFIX}${ROUTES.ADMIN.BASE}`, adminRoutes.router);
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    }
}
