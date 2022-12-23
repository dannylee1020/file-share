import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
dotenv.config({path: path.join(__dirname, "../.env")});

const upload_file = async function (file) {
    const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);

    const {data, error} = await supabase.storage
        .from("file-store")
        .upload("test_folder/test.txt", file);

    return {data, error};
};

export {upload_file};
