// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { saveFilee } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const filePath = await saveFilee(file);
    
    return NextResponse.json({ 
      success: true,
      path: filePath 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}