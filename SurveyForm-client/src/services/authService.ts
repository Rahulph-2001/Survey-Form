import api from '../config/api';
import { type AuthFormData } from '../validation/authSchema';
import { API_ROUTES } from '../config/routes';

export const authService = {
    login: async (credentials: AuthFormData) => {
        const response = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
        return response.data;
    },
};
