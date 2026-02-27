import { z } from 'zod'

export const CreateSurveySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
    gender: z.string().min(1, 'Gender is Required'),
    nationality:z.string().min(2,'Nationality is required'),
    email: z.string().email('Invalid email format').trim().toLowerCase(),
    phone:z.string().min(5, 'Phone number is requires').max(20),
    address: z.string().min(5,'Address must be at least 5 characters').max(500),
    message: z.string().max(1000).optional(),
    honeypot: z.string().max(100).optional()
});

export type CreateSurveyDTO = z.infer<typeof CreateSurveySchema>;