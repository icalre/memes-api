import {z} from "zod";
export const MemeValidator = z.object({
    title: z.string().nonempty(),
    image: z.string().url().nonempty("The email is required"),
    userId: z.number().int().nonnegative()
});