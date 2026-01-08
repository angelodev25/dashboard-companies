import z from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(30),
    role: z.string(),
    email: z.string(),
    phone: z.string(),
})