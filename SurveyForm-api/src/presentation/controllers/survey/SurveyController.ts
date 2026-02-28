import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICreateSurveyUseCase } from '../../../application/useCases/survey/interfaces/ICreateSurveyUseCase';
import { IGetAllSurveysUseCase } from '../../../application/useCases/survey/interfaces/IGetAllSurveysUseCase';
import { HttpStatusCode } from '../../../domain/enums/HttpStatusCode';
import { IResponseBuilder } from '../../http/IResponseBuilder';
import { SUCCESS_MESSAGES } from '../../../config/messages';
import { z } from 'zod';

const PaginationQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  search: z.string().optional().default(''),
});

interface BotFlagResult {
  bot: boolean;
}

@injectable()
export class SurveyController {
  constructor(
    @inject(TYPES.ICreateSurveyUseCase) private readonly _createSurveyUseCase: ICreateSurveyUseCase,
    @inject(TYPES.IGetAllSurveysUseCase) private readonly _getAllSurveysUseCase: IGetAllSurveysUseCase,
    @inject(TYPES.IResponseBuilder) private readonly _responseBuilder: IResponseBuilder
  ) {
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._createSurveyUseCase.execute(req.body);

      if (result && typeof result === 'object' && 'bot' in result && (result as BotFlagResult).bot) {
        res.status(HttpStatusCode.CREATED).json({ success: true, message: SUCCESS_MESSAGES.SURVEY.CREATED });
        return;
      }

      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.SURVEY.CREATED, HttpStatusCode.CREATED);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = PaginationQuerySchema.parse(req.query);
      const result = await this._getAllSurveysUseCase.execute(query.page, query.limit, query.search);

      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.SURVEY.FETCHED, HttpStatusCode.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}

