export const createUserAdapter = (data:any) => {
    return {
        name: data.name,
        email: data.email,
        password: data.password,
    };
}