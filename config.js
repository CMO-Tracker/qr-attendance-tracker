// config.js
// These are safe to expose in client-side code — the anon key
// only allows what our RLS policies permit (see Step 1).
const SUPABASE_URL = "https://gqmuykimcizzeelneevv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbXV5a2ltY2l6emVlbG5lZXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NTEwODEsImV4cCI6MjA5OTUyNzA4MX0.Z4dsBwuAwVo2ZcVOIpG8YUqVYu1jMD88Lcj3aZ8TaSY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);