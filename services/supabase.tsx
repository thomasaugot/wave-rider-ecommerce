import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database";
import * as dotenv from "dotenv";

dotenv.config();

// Ensure SUPABASE_URL and SUPABASE_ANON_KEY are defined to avoid type error (string | undefined)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY not found");
}

// Create Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
