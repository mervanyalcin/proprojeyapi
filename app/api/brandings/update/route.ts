
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
    const body = await req.json()
    const result = await prisma.brandings.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name,
            color: body.color,
            imageURL: body.imageURL,
            url: body.url,
        }
    })
    return NextResponse.json(result)
}