import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get timestamp of last commit
    const timestamp = execSync('git log -1 --format=%ct').toString().trim();

    return NextResponse.json({ 
      timestamp,
      success: true 
    });

  } catch (error) {
    console.error('Error getting last commit time:', error);
    
    // Return current time as fallback
    return NextResponse.json({
      timestamp: Math.floor(Date.now() / 1000).toString(),
      success: false
    }, {
      status: 500
    });
  }
}