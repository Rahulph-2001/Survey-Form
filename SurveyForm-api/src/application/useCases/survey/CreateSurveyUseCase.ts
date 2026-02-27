import { inject , injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types"; 
import { ISurveyRepository } from "../../../domain/repositories/ISurveyRepository";
import { ICreateSurveyUseCase } from "./interfaces/ICreateSurveyUseCase";
import { CreateSurveyDTO } from "../../dto/survey/CreateSurveyDTO";
import { Survey } from "../../../domain/entities/Survey";
import { ISurveyMapper } from "../../mappers/interfaces/ISurveyMapper";
import { SurveyResponseDTO } from "../../dto/survey/SurveyResponseDTO";
import { SurveyModel } from "../../../infrastructure/database/models/SurveyModel";
import { ValidationError } from "../../../domain/errors/AppError";
import { email } from "zod";

@injectable()
export class CreateSurveyUseCase implements ICreateSurveyUseCase {
    constructor(
        @inject(TYPES.ISurveyRepository) private _repository: ISurveyRepository,
        @inject(TYPES.ISurveyMapper) private _mapper: ISurveyMapper
    ) {}

    async execute(data: CreateSurveyDTO): Promise<any | null> {
        if(data.honeypot && data.honeypot.length >0){
            return { bot : true};
        }

        const domainEntity = new Survey({
            name: data.name,
            gender: data.gender,
            nationality: data.nationality,
            email: data.email,
            phone: data.phone,
            address: data.address,
            message: data.message || '',
        });

        const entity = await this._repository.create(domainEntity);
        return this._mapper.toResponseDTO(entity)
    }
}