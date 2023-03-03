import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";

var envPath = new URL(".env", import.meta.url).pathname;
dotenv.config({path: envPath});

const supabase = createClient('https://iyuctluisbrgxeykwvay.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dWN0bHVpc2JyZ3hleWt3dmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0MDQwNzEsImV4cCI6MTk4Njk4MDA3MX0.BKBgdPKQvKwajuf_6chK2YLc0qkFtuCn8GLrptLgR0I');
// const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);

export default supabase;
