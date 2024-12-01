import { NextResponse } from 'next/server';
import { deleteFile } from '@/utils/utils';

export async function DELETE(request: Request) {
  try {
    const { filePath } = await request.json();
    
    await deleteFile(filePath);
    
    return NextResponse.json({ 
      success: true 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting file' },
      { status: 500 }
    );
  }
}