import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync('commit-time.json', 'utf-8'));
    return NextResponse.json({ timestamp: data.timestamp, success: true });
  } catch (error) {
    return NextResponse.json({
      timestamp: Math.floor(Date.now() / 1000).toString(),
      success: false
    }, { status: 500 });
  }
}