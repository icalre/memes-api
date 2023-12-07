export const createMemeAdapter = (data:any) => {
    return {
        title: data.title,
        image: data.image,
        userId: data.userId,
    };
}