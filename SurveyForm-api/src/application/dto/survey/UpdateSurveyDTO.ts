import { z } from "zod";

export const UpdateSurveySchema = z.object({
    name: z.string().min(2).max(100).optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    nationality: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    address: z.string().min(5).max(200).optional(),
    message: z.string().min(10).max(1000).optional(),
});

export type UpdateSurveyDTO = z.infer<typeof UpdateSurveySchema>;
