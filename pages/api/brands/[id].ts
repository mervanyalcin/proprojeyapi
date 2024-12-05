// pages/api/brands/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // ID'yi al
    const brandId = req.query.id as string;

    // GET isteği - Marka detaylarını getir
    if (req.method === 'GET') {
        try {
            const brand = await prisma.brandings.findUnique({
                where: { id: brandId }
            });

            if (!brand) {
                return res.status(404).json({ error: 'Marka bulunamadı' });
            }

            return res.status(200).json(brand);
        } catch (error) {
            console.error('Marka getirme hatası:', error);
            return res.status(500).json({ error: 'Marka getirilirken bir hata oluştu' });
        }
    }

    // PUT isteği - Marka güncelle
    if (req.method === 'PUT') {
        try {
            const { name, image, order, color, url } = req.body;

            // Mevcut markayı kontrol et
            const existingBrand = await prisma.brandings.findUnique({
                where: { id: brandId }
            });

            if (!existingBrand) {
                return res.status(404).json({ error: 'Marka bulunamadı' });
            }

            let imageUrl = existingBrand.imageURL;

            // Yeni bir resim yüklendiyse
            if (image && image !== existingBrand.imageURL && image.startsWith('data:image')) {
                try {
                    // Eski resmi sil (varsa)
                    const oldImagePath = path.join(process.cwd(), 'public', existingBrand.imageURL);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }

                    // Yeni resmi kaydet
                    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    const fileName = `brand-${Date.now()}.png`;
                    const filePath = path.join(process.cwd(), 'public/uploads', fileName);
                    fs.writeFileSync(filePath, buffer);
                    imageUrl = `/uploads/${fileName}`;
                } catch (error) {
                    console.error('Resim işleme hatası:', error);
                    return res.status(500).json({ error: 'Resim işlenirken bir hata oluştu' });
                }
            }

            // Markayı güncelle
            const updatedBrand = await prisma.brandings.update({
                where: { id: brandId },
                data: {
                    name,
                    imageURL: imageUrl,
                    orderNumber: order,
                    color: color,
                    url: url,
                }
            });

            return res.status(200).json(updatedBrand);
        } catch (error) {
            console.error('Güncelleme hatası:', error);
            return res.status(500).json({ error: 'Marka güncellenirken bir hata oluştu' });
        }
    }

    // DELETE isteği - Marka sil
    if (req.method === 'DELETE') {
        try {
            const brand = await prisma.brandings.findUnique({
                where: { id: brandId }
            });

            if (!brand) {
                return res.status(404).json({ error: 'Marka bulunamadı' });
            }

            // Resmi sil
            if (brand.imageURL) {
                const imagePath = path.join(process.cwd(), 'public', brand.imageURL);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // Markayı sil
            await prisma.brandings.delete({
                where: { id: brandId }
            });

            return res.status(200).json({ message: 'Marka başarıyla silindi' });
        } catch (error) {
            console.error('Silme hatası:', error);
            return res.status(500).json({ error: 'Marka silinirken bir hata oluştu' });
        }
    }

    // Desteklenmeyen HTTP metodu
    return res.status(405).json({ error: 'Metod desteklenmiyor' });
}