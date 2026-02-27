import api from '../config/api';
import { type CreateSurveyForm, type Survey } from '../types/survey.types';
import { API_ROUTES } from '../config/routes';

export interface PaginatedSurveysResponse {
    data: Survey[];
    totalCount: number;
    page: number;
    totalPages: number;
}

export const surveyService = {
    submitSurvey: async (data: CreateSurveyForm) => {
        const response = await api.post(API_ROUTES.SURVEYS.PUBLIC, data);
        return response.data;
    },

    getAllSurveys: async (page = 1, limit = 10, search = '') => {
        const response = await api.get<{ success: boolean; data: PaginatedSurveysResponse; message: string }>(API_ROUTES.SURVEYS.ADMIN_BASE, {
            params: { page, limit, search }
        });
        return response.data;
    },
    updateSurvey: async (id: string, data: Partial<CreateSurveyForm>) => {
        const response = await api.put(`${API_ROUTES.SURVEYS.ADMIN_BASE}/${id}`, data);
        return response.data
    },

    deleteSurvey: async (id: string) => {
        const response = await api.delete(`${API_ROUTES.SURVEYS.ADMIN_BASE}/${id}`);
        return response.data
    }
};
