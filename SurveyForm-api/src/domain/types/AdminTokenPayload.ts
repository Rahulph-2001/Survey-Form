// SurveyForm-api/src/domain/types/AdminTokenPayload.ts

export interface AdminTokenPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}
