import fs from "fs";
import supabase from "../config.js";

const upload_file = async function (file, name) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .upload(`test_folder/${name}`, file);

    return {data, error};
};

const download_file = async function (name) {
    const {data, error} = await supabase.storage
        .from("file-store")
        .download(`test_folder/${name}`);

    const filePath = "/Users/dannylee/Downloads/" + name;

    if (error) {
        return error;
    } else {
        const blob = data;
        const buffer = Buffer.from(await blob.arrayBuffer());

        await fs.promises.writeFile(filePath, buffer);

        return `file saved to ${filePath}`;
    }
};

const retrieve_files = async function () {
    // TODO: filter emptyFolderPlaceholder
    const {data, error} = await supabase.storage
        .from("file-store")
        .list("test_folder", {
            sortBy: {column: "created_at"},
        });

    console.log(data);

    const newData = data.filter(
        (obj) => obj.name !== ".emptyFolderPlaceholder"
    );
    return {newData, error};
};

export {upload_file, retrieve_files, download_file};
