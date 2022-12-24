import supabase from "../config.js";

const upload_file = async function (file, name) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .upload(`test_folder/${name}`, file);

    return {data, error};
};

const retrieve_files = async function () {
    const {data, error} = await supabase.storage
        .from("file-store")
        .list("test_folder", {
            sortBy: {column: "created_at"},
        });

    return {data, error};
};

export {upload_file, retrieve_files};
