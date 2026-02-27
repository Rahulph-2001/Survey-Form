import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ISurveyRepository } from "../../../domain/repositories/ISurveyRepository";
import { ISurveyMapper } from "../../mappers/interfaces/ISurveyMapper";
import { IGetAllSurveysUseCase, PaginatedSurveyResult } from "../survey/interfaces/IGetAllSurveysUseCase";
import { SurveyResponseDTO } from "../../dto/survey/SurveyResponseDTO";

@injectable()

export class GetAllSurveysUseCase implements IGetAllSurveysUseCase {
    constructor(
        @inject(TYPES.ISurveyRepository) private _repository: ISurveyRepository,
        @inject(TYPES.ISurveyMapper) private _mapper: ISurveyMapper
    ) {}
    async execute(page: number, limit: number, search: string): Promise<PaginatedSurveyResult> {
        const { data, totalCount} = await this._repository.findAll(page, limit, search);

        const totalPages = Math.ceil(totalCount/limit);

        return {
            data: this._mapper.toResponseDTOList(data),
            totalCount,
            page,
            totalPages
        }
    }
}