// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { saveFile } from '@/utils/utils'

export async function POST(req: Request) {
  try {
    const formData = await req.formData() 
    const file = formData.get('file') as File

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 })
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      return new NextResponse("File must be an image", { status: 400 })
    }

    const filepath = await saveFile(file, "markalar")
    return NextResponse.json({ url: filepath })
  } catch (error) { 
    return new NextResponse("Internal error", { status: 500 })
  }
}