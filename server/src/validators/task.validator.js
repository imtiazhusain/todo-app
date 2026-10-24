import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string({ error: 'Title is required' }).trim().min(1, 'Title is required').max(100, 'Title must be 100 characters or fewer'),
  description: z.string().trim().max(500, 'Notes must be 500 characters or fewer').optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Title cannot be empty').max(100, 'Title must be 100 characters or fewer'),
    description: z.string().trim().max(500, 'Notes must be 500 characters or fewer'),
    completed: z.boolean(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: 'Provide at least one field to update' });
