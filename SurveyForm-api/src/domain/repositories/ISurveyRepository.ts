import { Survey } from "../entities/Survey";

export interface ISurveyRepository {
    create(survey: Survey): Promise<Survey>;
    findAll(page: number, limit: number, search: string): Promise<{ data: Survey[], totalCount: number }>;
    findByIdAndUpdate(id: string, data: Partial<Survey>): Promise<Survey | null>;
    deleteById(id: string): Promise<boolean>
}
