import { injectable } from "inversify";
import jwt from 'jsonwebtoken'
import { ITokenService } from "../../domain/services/ITokenService";
import { env } from '../../config/env'

@injectable()
export class JwtTokenService implements ITokenService {
    generateToken(payload: object): string {
        return jwt.sign(payload as any, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
    }
    verifyToken(token: string): any {
        return jwt.verify(token, env.JWT_SECRET);
    }
}