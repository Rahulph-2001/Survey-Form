import { Router } from 'express';
import { ROUTES } from '../../../config/routes';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { SurveyController } from '../../controllers/survey/SurveyController';
import { validateBody } from '../../middlewares/validationMiddleware';
import { surveySubmitLimiter } from '../../middlewares/rateLimiterMiddileware';
import { CreateSurveySchema } from '../../../application/dto/survey/CreateSurveyDTO';

@injectable()
export class SurveyRoutes {
    public readonly router: Router = Router();

    constructor(
        @inject(TYPES.SurveyController) private readonly _controller: SurveyController
    ) {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(
            '/',
            surveySubmitLimiter,
            validateBody(CreateSurveySchema),
            this._controller.create
        )
    }
}