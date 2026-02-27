export const SUCCESS_MESSAGES = {
    SURVEY: {
        CREATED: 'Survey responses submitted successfully!',
        FETCHED: 'Surveys fetched successfully',
        UPDATED: 'Survey updated successfully',
        DELETED: 'Survey deleted successfully',
    },
    ADMIN_LOGIN_SUCCESS: 'Login successfully!',
    SURVEY_CREATED: 'Survey created successfully',
    SURVEYS_FETCHED: 'Surveys retrieved successfully',
};

export const ERROR_MESSAGES = {
    AUTH: {
        INVALID_CREDENTIALS: 'Login failed: Invalid username or password.',
        MISSING_TOKEN: 'Access denied: No authentication token provided.',
        INVAILD_TOKEN: 'Access denied: Invalid or expired authentication token.',
    },
    SYSTEM: {
        UNAUTHORIZED: 'Access denied: Unauthorized action.',
        RATE_LIMITER: 'Too many requests, please try again later.'
    },
    SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};
