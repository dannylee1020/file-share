import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
dotenv.config({path: path.join(__dirname, "../.env")});

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);
const {data, error} = await supabase.storage.getBucket("file-store");
