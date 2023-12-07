export const createLikeAdapter = (data:any) => {
    return {
        userId: data.userId,
        memeId: data.memeId
    };
}