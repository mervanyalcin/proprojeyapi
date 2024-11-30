// app/api/projects/route.ts
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, description, images, cityId, countyId, brandingsId } = body

        if (!name || !description || !images || !images.length) {
            return new NextResponse("Missing required fields", { status: 400 })
        }
 
        const project = await prismadb.projects.create({
            data: {
                name: name,
                photoLinks: images,
                description: description,
                cityId: cityId,
                countyId: countyId,
                brandingsId: brandingsId,
            }
        })

        return NextResponse.json(project)
    } catch (error) { 
        return new NextResponse("Internal error", { status: 500 })
    }
}