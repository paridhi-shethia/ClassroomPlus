]const SUPABASE_URL = "https://ozuyxwvaeaktjoyxafui.supabase.co";
const SUPABASE_ANON_KEY = "your-actual-anon-key-here";

window._supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabase = window._supabaseClient;
