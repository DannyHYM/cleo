import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
// These URLs will need to be added to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log URL length to avoid exposing the full key in logs
console.log('Supabase URL configured:', !!supabaseUrl, 'length:', supabaseUrl.length);
console.log('Supabase Key configured:', !!supabaseAnonKey, 'length:', supabaseAnonKey.length);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 