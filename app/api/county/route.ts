
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const result = await prisma.county.findMany()

    return NextResponse.json(result)
}