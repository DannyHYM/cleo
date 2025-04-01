import { NextResponse } from 'next/server';

export async function GET() {
  // Return information about the environment variables (without exposing actual values)
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    supabaseUrlConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKeyConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    timestamp: new Date().toISOString(),
  });
} 