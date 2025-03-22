import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { name, email } = body;

    // Validate the input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Insert the data into the Supabase table
    const { data, error } = await supabase
      .from('Waitlist')
      .insert([{ name, email }])
      .select();

    if (error) {
      console.error('Error submitting to waitlist:', error.message, error.details, error.hint);
      
      // Check if it's a duplicate entry error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email address is already on the waitlist' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: `Failed to submit to waitlist: ${error.message}` },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist',
        data
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 