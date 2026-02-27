import dotenv from 'dotenv'
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    WINDOW_MS: 15 * 60 * 1000,
    MAX: 10,
}

if (!env.MONGO_URI || !env.JWT_SECRET) {
    throw new Error('Missing critical environment variables')
}