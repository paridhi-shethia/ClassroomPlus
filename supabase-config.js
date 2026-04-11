const SUPABASE_URL = "https://ozuyxwvaeaktjoyxafui.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dXl4d3ZhZWFrdGpveXhhZnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjE0MTgsImV4cCI6MjA5MTM5NzQxOH0.c9gsAvnqeGsaJ9BhihpDz0NE9eJn3nKoQuo6yCIc3zQ";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
