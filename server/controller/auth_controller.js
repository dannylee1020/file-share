import supabase from "../config.js";
import {body} from "express-validator";

const auth_user = async () => {
    // call supabase api for authentication
};

const validate_register = () => {};

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

export {auth_user, register_user};
