// SurveyForm-api/src/presentation/routes/admin/AdminRoutes.ts
import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { AdminController } from "../../controllers/admin/AdminController";
import { SurveyController } from "../../controllers/survey/SurveyController";
import { validateBody } from "../../middlewares/validationMiddleware"; 
import { LoginSchema } from "../../../application/dto/admin/LoginDTO";
import { UpdateSurveySchema } from "../../../application/dto/survey/UpdateSurveyDTO";
import { authMiddileware } from "../../middlewares/authMiddileware"; 
import { ROUTES } from "../../../config/routes";

@injectable()
export class AdminRoutes {
    public readonly router: Router;

    constructor(
        @inject(TYPES.AdminController) private _adminController: AdminController,
        @inject(TYPES.SurveyController) private _surveyController: SurveyController
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            ROUTES.ADMIN.LOGIN,
            validateBody(LoginSchema),
            this._adminController.login
        );

        this.router.get(
            ROUTES.ADMIN.SURVEYS,
            authMiddileware,
            this._surveyController.list
        );

        this.router.put(
            ROUTES.ADMIN.SURVEY_BY_ID,
            authMiddileware,
            validateBody(UpdateSurveySchema),
            this._adminController.updateSurvey
        );

        this.router.delete(
            ROUTES.ADMIN.SURVEY_BY_ID,
            authMiddileware,
            this._adminController.deleteSurvey
        );
    }
}
