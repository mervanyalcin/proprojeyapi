
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const result = await prisma.projects.findMany({
        include: {
            Brandings: true
        }
    })

    return NextResponse.json(result)
}