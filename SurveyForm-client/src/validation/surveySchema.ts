import { z } from 'zod';

export const surveySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        message: 'Please select a gender'
    }),
    nationality: z.string().min(2, 'Nationality is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format'),
    address: z.string().min(5, 'Address is required'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message is too long'),
    honeypot: z.string().optional(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;