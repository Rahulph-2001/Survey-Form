import { z } from 'zod';

export const SurveyResponseDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  nationality: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type SurveyResponseDTO = z.infer<typeof SurveyResponseDTOSchema>;
