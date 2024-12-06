// app/api/files/route.ts
import { NextResponse } from 'next/server';
import { deleteFile, getUploadedFiles } from '@/utils/utils';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        // URL'den search parametresini al

        const files = await getUploadedFiles(search);
        return NextResponse.json({ files });
    } catch (error) {
        return NextResponse.json(
            { error: 'Dosyalar listelenirken hata oluştu' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { filePath } = await request.json();
        await deleteFile(filePath);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Dosya silme hatası' },
            { status: 500 }
        );
    }
}