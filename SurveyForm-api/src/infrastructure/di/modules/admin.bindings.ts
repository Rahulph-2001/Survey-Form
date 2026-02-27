import { Container } from 'inversify';
import { TYPES } from '../types';
import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';
import { AdminRepository } from '../../database/repositories/AdminRepository';
import { ITokenService } from '../../../domain/services/ITokenService';
import { JwtTokenService } from '../../services/JwtTokenService';
import { IAdminLoginUseCase } from '../../../application/useCases/admin/interfaces/IAdminLoginUseCase';
import { AdminLoginUseCase } from '../../../application/useCases/admin/AdminLoginUseCase';
import { AdminController } from '../../../presentation/controllers/admin/AdminController'; 
import { AdminRoutes } from '../../../presentation/routes/admin/AdminRoutes'; 
export function registerAdminBindings(container: Container): void {
    container.bind<IAdminRepository>(TYPES.IAdminRepository).to(AdminRepository).inSingletonScope();

    container.bind<ITokenService>(TYPES.ITokenService).to(JwtTokenService).inSingletonScope();

    container.bind<IAdminLoginUseCase>(TYPES.IAdminLoginUseCase).to(AdminLoginUseCase).inSingletonScope();

    container.bind<AdminController>(TYPES.AdminController).to(AdminController).inSingletonScope();

    container.bind<AdminRoutes>(TYPES.AdminRoutes).to(AdminRoutes).inSingletonScope()
}