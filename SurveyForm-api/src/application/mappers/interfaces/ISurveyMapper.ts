import { Survey } from "../../../domain/entities/Survey";
import { SurveyResponseDTO } from "../../dto/survey/SurveyResponseDTO";

export interface ISurveyMapper {
    toResponseDTO(entity: Survey): SurveyResponseDTO;
    toResponseDTOList(entities: Survey[]): SurveyResponseDTO[];
}