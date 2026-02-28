import { injectable } from "inversify";
import jwt from 'jsonwebtoken'
import { ITokenService } from "../../domain/services/ITokenService";
import { AdminTokenPayload } from "../../domain/types/AdminTokenPayload";
import { env } from '../../config/env'

@injectable()
export class JwtTokenService implements ITokenService {
    generateToken(payload: object): string {
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
    }
    verifyToken(token: string): AdminTokenPayload {
        return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
    }
}
