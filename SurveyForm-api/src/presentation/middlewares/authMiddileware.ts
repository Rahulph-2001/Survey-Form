import { Request, Response, NextFunction } from 'express';
import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../infrastructure/di/types';
import { ITokenService } from '../../domain/services/ITokenService';
import { UnauthorizedError } from '../../domain/errors/AppError';
import { ERROR_MESSAGES } from '../../config/messages';
import { AdminTokenPayload } from '../../domain/types/AdminTokenPayload';

declare global {
    namespace Express {
        interface Request {
            admin?: AdminTokenPayload
        }
    }
}

export const authMiddileware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.adminToken as string | undefined;
        if (!token) {
            throw new UnauthorizedError(ERROR_MESSAGES.SYSTEM.UNAUTHORIZED);
        }

        const tokenService = container.get<ITokenService>(TYPES.ITokenService);
        const decoded = tokenService.verifyToken(token);
        req.admin = decoded;

        next();

    } catch (error) {
        next(new UnauthorizedError(ERROR_MESSAGES.SYSTEM.UNAUTHORIZED));
    }
};
