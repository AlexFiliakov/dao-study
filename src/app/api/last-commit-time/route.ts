import { execSync } from 'child_process';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Get timestamp of last commit
    const timestamp = execSync('git log -1 --format=%ct').toString().trim();

    return new NextResponse(JSON.stringify({ 
      timestamp,
      success: true 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error getting last commit time:', error);
    
    return new NextResponse(JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000).toString(),
      success: false
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}