import { z } from 'zod';

export const renameDirectoryFormSchema = z.object({
  title: z.string().trim().min(1, "Title can't be empty").max(48, 'Title too long'),
});
