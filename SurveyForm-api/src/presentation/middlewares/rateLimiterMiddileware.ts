import rateLimit from "express-rate-limit";
import { env } from "../../config/env";
import { ERROR_MESSAGES } from "../../config/messages";

export const surveySubmitLimiter = rateLimit({
    windowMs: env.WINDOW_MS,
    max: env.MAX,
    message: {
        success: false,
        message: ERROR_MESSAGES.SYSTEM.RATE_LIMITER
    },
    standardHeaders: true,
    legacyHeaders: false
})