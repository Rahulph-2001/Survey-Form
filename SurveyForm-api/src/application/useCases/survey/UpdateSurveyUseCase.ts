import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ISurveyRepository } from "../../../domain/repositories/ISurveyRepository";
import { IUpdateSurveyUseCase } from "./interfaces/IUpdateSurveyUseCase";
import { UpdateSurveyDTO } from "../../dto/survey/UpdateSurveyDTO";
import { SurveyResponseDTO } from "../../dto/survey/SurveyResponseDTO";
import { NotFoundError } from "../../../domain/errors/AppError"; 
import { ISurveyMapper } from "../../mappers/interfaces/ISurveyMapper";

@injectable()
export class UpdateSurveyUseCase implements IUpdateSurveyUseCase {
    constructor(
        @inject(TYPES.ISurveyRepository) private _repository: ISurveyRepository,
        @inject(TYPES.ISurveyMapper) private _mapper: ISurveyMapper
    ) {}

    async execute(id: string, data: UpdateSurveyDTO): Promise<SurveyResponseDTO> {
        const updatedSurvey = await this._repository.findByIdAndUpdate(id, data);
        if(!updatedSurvey){
            throw new NotFoundError(` Survey with ID ${id} not found`)
        }
        return this._mapper.toResponseDTO(updatedSurvey)
    }
}