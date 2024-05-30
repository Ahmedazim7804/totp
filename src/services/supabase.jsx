import { createClient } from "@supabase/supabase-js";

// eslint-disable-next-line no-undef
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// eslint-disable-next-line no-undef
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
