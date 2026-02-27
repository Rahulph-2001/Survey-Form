import { LoginDTO } from "../../../dto/admin/LoginDTO";
import { AdminTokenResponseDTO } from "../../../dto/admin/AdminTokenResponseDTO";

export interface IAdminLoginUseCase {
    execute(data: LoginDTO): Promise<AdminTokenResponseDTO>
}