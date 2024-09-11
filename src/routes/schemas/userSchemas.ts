import {z} from "zod"


export const userCreationSchema = z.object({
    name : z.string().min(5),
    email : z.string().email(),
})

export const userUpdateSchema = z.object({
    name : z.string().min(5).optional(),
    email : z.string().email().optional()
})