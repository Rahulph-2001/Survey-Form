import { CreateSurveyDTO } from "../../../dto/survey/CreateSurveyDTO";
import { SurveyResponseDTO } from "../../../dto/survey/SurveyResponseDTO";

export interface ICreateSurveyUseCase {
    execute(data: CreateSurveyDTO): Promise<SurveyResponseDTO | null>;
   
}