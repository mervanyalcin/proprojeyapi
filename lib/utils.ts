// lib/utils.ts
import fs from 'fs'
import path from 'path'

export const saveFile = async (file: File): Promise<string> => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Benzersiz dosya adı oluştur
    const filename = `${Date.now()}-${file.name}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    // uploads klasörünü kontrol et ve yoksa oluştur
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filepath = path.join(uploadDir, filename)

    // Dosyayı kaydet
    fs.writeFileSync(filepath, buffer)
    return `/uploads/${filename}` // Public URL path'i döndür
}