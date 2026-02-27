export interface IDeleteSurveyUseCase {
    execute(id: string): Promise<void>
}