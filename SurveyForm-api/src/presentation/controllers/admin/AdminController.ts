import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { IAdminLoginUseCase } from "../../../application/useCases/admin/interfaces/IAdminLoginUseCase";
import { IUpdateSurveyUseCase } from "../../../application/useCases/survey/interfaces/IUpdateSurveyUseCase";
import { IDeleteSurveyUseCase } from "../../../application/useCases/survey/interfaces/IDeleteSurveyUseCase";
import { HttpStatusCode } from "../../../domain/enums/HttpStatusCode";
import { IResponseBuilder } from "../../http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";
import { env } from "../../../config/env";

@injectable()
export class AdminController {
    constructor(
        @inject(TYPES.IAdminLoginUseCase) private readonly _adminLoginUseCase: IAdminLoginUseCase,
        @inject(TYPES.IUpdateSurveyUseCase) private readonly _updateSurveyUseCase: IUpdateSurveyUseCase,
        @inject(TYPES.IDeleteSurveyUseCase) private readonly _deleteSurveyUseCase: IDeleteSurveyUseCase,
        @inject(TYPES.IResponseBuilder) private readonly _responseBuilder: IResponseBuilder
    ) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.me = this.me.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this._adminLoginUseCase.execute(req.body);

            const isProduction = env.NODE_ENV === 'production';
            res.cookie('adminToken', result.token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: env.COOKIE_MAX_AGE,
            });

            const response = this._responseBuilder.success(
                { message: SUCCESS_MESSAGES.ADMIN_LOGIN_SUCCESS },
                SUCCESS_MESSAGES.ADMIN_LOGIN_SUCCESS,
                HttpStatusCode.OK
            );
            res.status(response.statusCode).json(response.body);
        } catch (error) {
            next(error);
        }
    }

    public logout(req: Request, res: Response, next: NextFunction): void {
        try {
            const isProduction = env.NODE_ENV === 'production';
            res.clearCookie('adminToken', {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
            });
            const response = this._responseBuilder.success(null, 'Logged out successfully', HttpStatusCode.OK);
            res.status(response.statusCode).json(response.body);
        } catch (error) {
            next(error);
        }
    }

    public me(req: Request, res: Response, next: NextFunction): void {
        try {
            const response = this._responseBuilder.success(
                { id: req.admin?.id, username: req.admin?.username },
                'Authenticated',
                HttpStatusCode.OK
            );
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

