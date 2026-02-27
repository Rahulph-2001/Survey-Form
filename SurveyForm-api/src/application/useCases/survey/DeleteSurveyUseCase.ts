import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ISurveyRepository } from "../../../domain/repositories/ISurveyRepository";
import { IDeleteSurveyUseCase } from "./interfaces/IDeleteSurveyUseCase";
import { NotFoundError } from "../../../domain/errors/AppError";

@injectable()
export class DeleteSurveyUseCase implements IDeleteSurveyUseCase {
    constructor(
        @inject(TYPES.ISurveyRepository) private _repository: ISurveyRepository
    ) {}

    async execute(id: string) : Promise<void> {
        const isDeleted = await this._repository.deleteById(id);
        if(!isDeleted){
            throw new NotFoundError(`Survey with ID ${id} not found`);
        }
    }
}