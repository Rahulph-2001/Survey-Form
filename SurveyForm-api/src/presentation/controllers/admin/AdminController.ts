import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { IAdminLoginUseCase } from "../../../application/useCases/admin/interfaces/IAdminLoginUseCase";
import { IUpdateSurveyUseCase } from "../../../application/useCases/survey/interfaces/IUpdateSurveyUseCase";
import { IDeleteSurveyUseCase } from "../../../application/useCases/survey/interfaces/IDeleteSurveyUseCase";
import { HttpStatusCode } from "../../../domain/enums/HttpStatusCode";
import { IResponseBuilder } from "../../http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";

@injectable()
export class AdminController {
    constructor(
        @inject(TYPES.IAdminLoginUseCase) private readonly _adminLoginUseCase: IAdminLoginUseCase,
        @inject(TYPES.IUpdateSurveyUseCase) private readonly _updateSurveyUseCase: IUpdateSurveyUseCase,
        @inject(TYPES.IDeleteSurveyUseCase) private readonly _deleteSurveyUseCase: IDeleteSurveyUseCase,
        @inject(TYPES.IResponseBuilder) private readonly _responseBuilder: IResponseBuilder
    ) {
        this.login = this.login.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this._adminLoginUseCase.execute(req.body);
            const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.ADMIN_LOGIN_SUCCESS, HttpStatusCode.OK);
            res.status(response.statusCode).json(response.body);
        } catch (error) {
            next(error);
        }
    }

    public async updateSurvey(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await this._updateSurveyUseCase.execute(id as string, data);
            const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.SURVEY.UPDATED, HttpStatusCode.OK);
            res.status(response.statusCode).json(response.body)

        } catch (error) {
            next(error)
        }
    }

    public async deleteSurvey(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params;
            await this._deleteSurveyUseCase.execute(id as string);
            const response = this._responseBuilder.success(null, SUCCESS_MESSAGES.SURVEY.DELETED, HttpStatusCode.OK)
            res.status(response.statusCode).json(response.body)

        } catch (error) {
            next(error)
        }
    }
}
