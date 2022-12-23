import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";

var envPath = new URL(".env", import.meta.url).pathname;
dotenv.config({path: envPath});

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);

export default supabase;
