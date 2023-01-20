import supabase from "../config.js";

const authenticate_user = async (req) => {
    // call supabase api for authentication
    let body = req.body;

    const {data, error} = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    });

    return {data, error};
};

const register_user = async (body) => {
    const {data, error} = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
        options: {
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
            },
        },
    });

    return {data, error};
};

const logout_user = async () => {
    const {error} = await supabase.auth.signOut();

    return {error};
};

export {authenticate_user, register_user, logout_user};
