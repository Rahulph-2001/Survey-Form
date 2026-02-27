import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../domain/errors/AppError';
import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../infrastructure/di/types';
import { IResponseBuilder } from '../http/IResponseBuilder';
import { HttpStatusCode } from '../../domain/enums/HttpStatusCode';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    console.error('[Error]:', err);
    
    const responseBuilder = container.get<IResponseBuilder>(TYPES.IResponseBuilder);

    let error = err
    if(!(err instanceof AppError)){
        error = {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            name: 'InternalError',
            message: err.message || 'Something went wrong'
        } as any
    }

    const response = responseBuilder.error(error)
    res.status(response.statusCode).json(response.body)
}