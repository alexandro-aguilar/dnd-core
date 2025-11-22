import { z } from 'zod';

export const inputGetUsersSchema = z.object({
  rawQueryString: z.string().optional(),
});
