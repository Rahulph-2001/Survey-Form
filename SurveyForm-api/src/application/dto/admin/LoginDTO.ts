import { z } from 'zod'

export const LoginSchema = z.object({
    username: z.string().min(3).trim(),
    password: z.string().min(6)
});

export type LoginDTO = z.infer<typeof LoginSchema>