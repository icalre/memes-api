export const createCommentAdapter = (data:any) => {
    return {
        text: data.text,
        userId: data.userId,
        memeId: data.memeId
    };
}