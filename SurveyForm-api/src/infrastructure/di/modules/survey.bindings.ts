import { Container } from 'inversify';
import { TYPES } from '../types';

// Repositories
import { ISurveyRepository } from '../../../domain/repositories/ISurveyRepository';
import { SurveyRepository } from '../../database/repositories/SurveyRepository';

// Mappers
import { ISurveyMapper } from '../../../application/mappers/interfaces/ISurveyMapper';
import { SurveyMapper } from '../../../application/mappers/SurveyMapper';

// Use Cases
import { ICreateSurveyUseCase } from '../../../application/useCases/survey/interfaces/ICreateSurveyUseCase';
import { CreateSurveyUseCase } from '../../../application/useCases/survey/CreateSurveyUseCase';
import { IGetAllSurveysUseCase } from '../../../application/useCases/survey/interfaces/IGetAllSurveysUseCase';
import { GetAllSurveysUseCase } from '../../../application/useCases/survey/GetAllSurveysUseCase';
import { IUpdateSurveyUseCase } from '../../../application/useCases/survey/interfaces/IUpdateSurveyUseCase';
import { UpdateSurveyUseCase } from '../../../application/useCases/survey/UpdateSurveyUseCase';
import { IDeleteSurveyUseCase } from '../../../application/useCases/survey/interfaces/IDeleteSurveyUseCase';
import { DeleteSurveyUseCase } from '../../../application/useCases/survey/DeleteSurveyUseCase';

import { SurveyController } from '../../../presentation/controllers/survey/SurveyController';
import { SurveyRoutes } from '../../../presentation/routes/survey/SurveyRoutes';

export function registerSurveyBinding(container: Container): void {
    container.bind<ISurveyRepository>(TYPES.ISurveyRepository).to(SurveyRepository).inSingletonScope();

    container.bind<ISurveyMapper>(TYPES.ISurveyMapper).to(SurveyMapper).inSingletonScope();

    container.bind<ICreateSurveyUseCase>(TYPES.ICreateSurveyUseCase).to(CreateSurveyUseCase).inRequestScope();
    container.bind<IGetAllSurveysUseCase>(TYPES.IGetAllSurveysUseCase).to(GetAllSurveysUseCase).inRequestScope();
    container.bind<IUpdateSurveyUseCase>(TYPES.IUpdateSurveyUseCase).to(UpdateSurveyUseCase).inRequestScope();
    container.bind<IDeleteSurveyUseCase>(TYPES.IDeleteSurveyUseCase).to(DeleteSurveyUseCase).inRequestScope();

    container.bind<SurveyController>(TYPES.SurveyController).to(SurveyController).inSingletonScope();

    container.bind<SurveyRoutes>(TYPES.SurveyRoutes).to(SurveyRoutes).inSingletonScope();
}
