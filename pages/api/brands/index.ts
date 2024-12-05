// pages/api/brands/index.ts
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
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, image, url, color, order } = req.body;

        // Base64 formatındaki resmi çözümleme
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Resim için benzersiz bir isim oluşturma
        const fileName = `brand-${Date.now()}.png`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);

        // Resmi public/uploads klasörüne kaydetme
        fs.writeFileSync(filePath, buffer);

        // Veritabanına marka bilgilerini kaydetme
        const brand = await prisma.brandings.create({
            data: {
                name,
                imageURL: `/uploads/${fileName}`,
                color: color,
                orderNumber: order,
                url: url,
            }
        });

        return res.status(201).json(brand);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}