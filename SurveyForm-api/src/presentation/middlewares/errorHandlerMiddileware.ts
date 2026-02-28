import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../domain/errors/AppError';
import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../infrastructure/di/types';
import { IResponseBuilder } from '../http/IResponseBuilder';
import { HttpStatusCode } from '../../domain/enums/HttpStatusCode';

interface NormalizedAppError {
    statusCode: number;
    name: string;
    message: string;
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('[Error]:', err);

    const responseBuilder = container.get<IResponseBuilder>(TYPES.IResponseBuilder);

    let error: Error | NormalizedAppError = err;
    if (!(err instanceof AppError)) {
        const normalizedError: NormalizedAppError = {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            name: 'InternalError',
            message: err.message || 'Something went wrong',
        };
        error = normalizedError;
    }

    const response = responseBuilder.error(error as AppError);
    res.status(response.statusCode).json(response.body);
};
