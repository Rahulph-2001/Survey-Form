export interface Survey {
    id: string;
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    createdAt: string;
}

export interface CreateSurveyForm {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    honeypot?: string;
}