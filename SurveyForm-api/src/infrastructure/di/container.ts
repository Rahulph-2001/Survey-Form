import { Container } from 'inversify';
import { TYPES } from './types';
import { IResponseBuilder } from '../../presentation/http/IResponseBuilder'; 
import { ResponseBuilder } from '../../presentation/http/ResponseBuilder'; 
import { registerSurveyBinding } from './modules/survey.bindings'; 
import { registerAdminBindings } from './modules/admin.bindings';

const container = new Container();

container.bind<IResponseBuilder>(TYPES.IResponseBuilder).to(ResponseBuilder).inSingletonScope();

registerSurveyBinding(container)
registerAdminBindings(container)

export {container};