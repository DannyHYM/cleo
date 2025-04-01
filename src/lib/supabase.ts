import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
// These URLs will need to be added to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Skip detailed logging in production to avoid console clutter
if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase URL configured:', !!supabaseUrl, 'length:', supabaseUrl.length);
  console.log('Supabase Key configured:', !!supabaseAnonKey, 'length:', supabaseAnonKey.length);
}

// Provide default values for build time or create a mock client
let supabase: SupabaseClient;

// Only attempt to create a real client if we have credentials
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client for build time or when env vars are missing
  console.warn('Using mock Supabase client due to missing environment variables');
  
  // Mock client with empty methods that won't crash
  supabase = createClient('https://placeholder-url.supabase.co', 'placeholder-key') as SupabaseClient;
}

export default supabase; 