import { AdminTokenPayload } from '../types/AdminTokenPayload';

export interface ITokenService {
    generateToken(payload: object): string;
    verifyToken(token: string): AdminTokenPayload;
}