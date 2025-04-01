import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and Anon Key from the Supabase Dashboard > Settings > API
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);