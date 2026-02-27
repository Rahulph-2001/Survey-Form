import mongoose, { Schema , Document} from "mongoose";

export interface ISurveyDocument extends Document {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const SurveySchema: Schema = new Schema({
    name: {type: String, required: true},
    gender: { type: String, required: true},
    nationality: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    message: {type: String, default: ''}
}, {timestamps: true})

export const SurveyModel = mongoose.model<ISurveyDocument>('Survey',SurveySchema);