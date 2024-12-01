// lib/utils.ts
import { FileType } from '@/app/types'
import fs from 'fs'
import path from 'path'

export const saveFile = async (file: File, folderName: string): Promise<string> => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Benzersiz dosya adı oluştur
  const filename = `${Date.now()}-${file.name}`
  const uploadDir = path.join(process.cwd(), 'public', `uploads/${folderName}`)

  // uploads klasörünü kontrol et ve yoksa oluştur
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const filepath = path.join(uploadDir, filename)

  // Dosyayı kaydet
  fs.writeFileSync(filepath, buffer)
  return `${filename}` // Public URL path'i döndür
}


// export const saveFile = async (file: File): Promise<string> => {
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const fileName = `${Date.now()}-${file.name}`;


//   const filePath = path.join(process.cwd(), 'public', `folderName`, fileName);


//   await fs.promises.writeFile(filePath, buffer);
//   return `${fileName}`;
// };

export const deleteFile = async (filePath: string) => {
  const fullPath = path.join(process.cwd(), `public`, filePath);
  await fs.promises.unlink(fullPath);
};

// export const getUploadedFiles = async (): Promise<FileType[]> => {
//   const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

//   try {
//     const files = await fs.promises.readdir(uploadsDir);

//     return files.map(filename => ({
//       id: filename.split('-')[0], // timestamp'i ID olarak kullanıyoruz
//       name: filename.split('-').slice(1).join('-'), // orijinal dosya adı
//       path: `/uploads/${filename}`,
//       createdAt: new Date(parseInt(filename.split('-')[0])) // timestamp'den tarih oluştur
//     }));
//   } catch (error) {
//     console.error('Error reading uploads directory:', error);
//     return [];
//   }
// };

export const getUploadedFiles = async (searchTerm?: string): Promise<FileType[]> => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    const files = await fs.promises.readdir(uploadsDir);

    let fileList = files.map(filename => ({
      id: filename.split('-')[0],
      name: filename,
      path: `/uploads/${filename}`,
      createdAt: new Date(parseInt(filename.split('-')[0]))
    }));


    // // Eğer arama terimi varsa, dosya adına göre filtreleme yap
    if (searchTerm) {
      fileList = fileList.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    // Dosyaları tarihe göre sırala (en yeniden en eskiye)
    return fileList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error reading uploads directory:', error);
    return [];
  }
};