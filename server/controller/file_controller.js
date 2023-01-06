import fs from "fs";
import supabase from "../config.js";

const upload_file = async function (file, name) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .upload(`test_folder/${name}`, file);

    return {data, error};
};

const download_file = async function (name, res) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .download(`test_folder/${name}`);

    if (error) {
        throw error;
    }

    console.log(data);

    // convert blob into buffer and send to client
    const blob = data;
    const buffer = Buffer.from(await blob.arrayBuffer());

    return buffer;
};

const retrieve_files = async function () {
    const {data, error} = await supabase.storage
        .from("file-store")
        .list("test_folder", {
            sortBy: {column: "created_at"},
        });

    const newData = data.filter(
        (obj) => obj.name !== ".emptyFolderPlaceholder"
    );
    return {newData, error};
};

export {upload_file, retrieve_files, download_file};
