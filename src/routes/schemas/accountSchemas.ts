import { z } from "zod";

export const accountCreationSchema = z.object({
  currency: z.string().min(3).max(4),
  amount: z.number(),
  userId: z.number(),
});



export const updateAccountSchema = z.object({
  currency : z.string().min(3).max(4).optional(),
  amount : z.number().optional(),
  userId : z.number().optional()
})
