import { inject, injectable } from "inversify";
import bcrypt from 'bcrypt'
import { TYPES } from '../../../infrastructure/di/types'
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { IAdminLoginUseCase } from "./interfaces/IAdminLoginUseCase";
import { LoginDTO } from "../../dto/admin/LoginDTO";
import { AdminTokenResponseDTO } from "../../dto/admin/AdminTokenResponseDTO";
import { UnauthorizedError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";
import { ITokenService } from "../../../domain/services/ITokenService";

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
    constructor(
        @inject(TYPES.IAdminRepository) private _repository: IAdminRepository,
        @inject(TYPES.ITokenService) private _tokenService: ITokenService
    ) { }

    async execute(data: LoginDTO): Promise<AdminTokenResponseDTO> {
        const admin = await this._repository.findByUsername(data.username);

        if (!admin) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        const isPasswordValid = await bcrypt.compare(data.password, admin.passwordHash)
        if (!isPasswordValid) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS)
        }

        const token = this._tokenService.generateToken({
            id: admin.id,
            username: admin.username
        });
        return { token }
    }
}