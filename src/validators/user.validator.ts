import {z} from "zod";
export const UserValidator = z.object({
    name: z.string().nonempty("The name is required"),
    email: z.string().email().nonempty("The email is required"),
    password: z.string().nonempty("The password is required").min(8).max(255)
});

export const UserLoginValidator = z.object({
    email: z.string().email().nonempty("The email is required"),
    password: z.string().nonempty("The password is required").min(8).max(255)
});