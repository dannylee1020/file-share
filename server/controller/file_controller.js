import supabase from "../config.js";

const upload_file = async function (file) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .upload("test_folder/test.txt", file);

    return {data, error};
};

const retrieve_files = async function () {
    const {data, error} = await supabase.storage
        .from("file-store")
        .list("test_folder", {
            offset: 1,
            sortBy: {column: "created_at"},
        });

    return {data, error};
};

export {upload_file, retrieve_files};
