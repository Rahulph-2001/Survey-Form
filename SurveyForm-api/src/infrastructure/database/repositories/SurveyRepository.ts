import { injectable } from "inversify";
import { ISurveyRepository } from "../../../domain/repositories/ISurveyRepository";
import { Survey } from "../../../domain/entities/Survey";
import { SurveyModel, ISurveyDocument } from "../models/SurveyModel";

@injectable()
export class SurveyRepository implements ISurveyRepository {
    async create(survey: Survey): Promise<Survey> {
        const created = await SurveyModel.create({
            name: survey.name,
            gender: survey.gender,
            nationality: survey.nationality,
            email: survey.email,
            phone: survey.phone,
            address: survey.address,
            message: survey.message
        });
        return this.toDomain(created);
    }

    async findAll(page: number, limit: number, search: string): Promise<{ data: Survey[], totalCount: number }> {
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const [surveys, totalCount] = await Promise.all([
            SurveyModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            SurveyModel.countDocuments(query)
        ]);

        return {
            data: surveys.map((doc) => this.toDomain(doc as any)),
            totalCount
        };
    }

    async findByIdAndUpdate(id: string, data: Partial<Survey>): Promise<Survey | null> {
        const updated = await SurveyModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }

        );
        if (!updated) return null;
        return this.toDomain(updated as any)
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await SurveyModel.findByIdAndDelete(id)
        return !!result;
    }
   

    private toDomain(doc: ISurveyDocument): Survey {
        return new Survey({
            id: doc._id.toString(),
            name: doc.name,
            gender: doc.gender,
            nationality: doc.nationality,
            email: doc.email,
            phone: doc.phone,
            address: doc.address,
            message: doc.message,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    }
}
