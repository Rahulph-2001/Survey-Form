import { injectable } from "inversify";
import { Survey } from "../../domain/entities/Survey";
import { SurveyResponseDTO } from "../dto/survey/SurveyResponseDTO";
import { ISurveyMapper } from "./interfaces/ISurveyMapper";

@injectable()

export class SurveyMapper implements ISurveyMapper {
    public toResponseDTO(entity: Survey): SurveyResponseDTO {
        return {
            id: entity.id,
            name: entity.name,
            gender: entity.gender,
            nationality: entity.nationality,
            email: entity.email,
            phone: entity.phone,
            address: entity.address,
            message: entity.message,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }

    public toResponseDTOList(entities: Survey[]): SurveyResponseDTO[]{
        return entities.map(entity => this.toResponseDTO(entity))
    }
}