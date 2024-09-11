import {z} from "zod"


export const userCreationSchema = z.object({
    name : z.string().min(5),
    email : z.string().email(),
})

export const accountCreationSchema = z.object({
    currency : z.string().min(3).max(4), 
    amount : z.number() ,
    userId :z.number()  ,
})