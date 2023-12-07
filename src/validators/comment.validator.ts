import {z} from "zod";
export const CommentValidator = z.object({
    text: z.string().nonempty(),
    memeId: z.number().int().nonnegative(),
    userId: z.number().int().nonnegative()
});