import { SurveyResponseDTO } from "../../../dto/survey/SurveyResponseDTO";



export interface PaginatedSurveyResult {
    data: SurveyResponseDTO[];
    totalCount: number;
    page: number;
    totalPages: number
}
export interface IGetAllSurveysUseCase {
    execute(page: number , limit: number, search: string): Promise<PaginatedSurveyResult>;
}
