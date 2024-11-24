

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const body = await req.json();
    const result = await prisma.brandings.findUnique({
        where: {
            id: body.id
        }
    })
    return NextResponse.json(result);
}