import { z } from 'zod';

export const weatherQuerySchema = z.object({
  city: z.string({ error: 'City is required' }).trim().min(1, 'City is required').max(60, 'City name is too long'),
});