import {z} from "zod";
export const LikeValidator = z.object({
    memeId: z.number().int().nonnegative(),
    userId: z.number().int().nonnegative()
});