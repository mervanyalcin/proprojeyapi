// app/api/files/route.ts
import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/utils';

export async function DELETE(request: Request) {
  try {
    const { filePath } = await request.json();
    
    await deleteFile(filePath);
    
    return NextResponse.json({ 
      success: true 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Dosya silme hatası' },
      { status: 500 }
    );
  }
}