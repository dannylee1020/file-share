import express from "express";
import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

var router = express.Router();
let dirname = new URL("../.env", import.meta.url).pathname;
dotenv.config({path: dirname});

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);

/* GET home page. */
router.post("/", async (req, res) => {
    let file = req.files[0];
    let {data, error} = await supabase.storage
        .from("file-store")
        .upload("test_folder/test.txt", file);

    if (!error) {
        res.send({message: "upload successful"});
    } else {
        res.send(error);
    }
});

export default router;
