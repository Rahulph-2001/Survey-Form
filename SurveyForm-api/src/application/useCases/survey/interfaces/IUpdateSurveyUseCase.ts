import { UpdateSurveyDTO } from "../../../dto/survey/UpdateSurveyDTO";
import { SurveyResponseDTO } from "../../../dto/survey/SurveyResponseDTO";

export interface IUpdateSurveyUseCase {
    execute(id : string, data: UpdateSurveyDTO): Promise<SurveyResponseDTO>;
}