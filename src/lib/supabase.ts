import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and Anon Key from the Supabase Dashboard > Settings > API
const supabaseUrl = 'https://eygezanxkjzkierkxubh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Z2V6YW54a2p6a2llcmt4dWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjY2MjgsImV4cCI6MjA1OTEwMjYyOH0.mAlOH8qBTGfG0UVF8xZt_5T2XGOzP5VxDrtCf5z33cI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);