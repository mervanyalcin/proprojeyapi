// lib/utils.ts
import { promises as fs } from 'fs'
import path from 'path'

export async function deleteFile(filename: string) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const filepath = path.join(uploadDir, filename)
  
  try {
    await fs.access(filepath) // Şimdi promise versiyonunu kullanıyor
    await fs.unlink(filepath) // Dosyayı sil
  } catch (error) {
    throw new Error('File not found or could not be deleted')
  }
}