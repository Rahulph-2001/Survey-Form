export const TYPES = {

    ISurveyRepository: Symbol.for('ISurveyRepository'),
    IAdminRepository: Symbol.for('IAdminRepository'),


    ITokenService: Symbol.for('ITokenService'),


    ICreateSurveyUseCase: Symbol.for('ICreateSurveyUseCase'),
    IGetAllSurveysUseCase: Symbol.for('IGetAllSurveysUseCase'),
    IUpdateSurveyUseCase: Symbol.for('IUpdateSurveyUseCase'),
    IDeleteSurveyUseCase: Symbol.for('IDeleteSurveyUseCase'),


    IAdminLoginUseCase: Symbol.for('IAdminLoginUseCase'),


    ISurveyMapper: Symbol.for('ISurveyMapper'),


    SurveyController: Symbol.for('SurveyController'),
    AdminController: Symbol.for('AdminController'),


    SurveyRoutes: Symbol.for('SurveyRoutes'),
    AdminRoutes: Symbol.for('AdminRoutes'),


    IResponseBuilder: Symbol.for('IResponseBuilder'),
};
