import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json(); 
    const result = await prisma.projects.findMany({
        where: {
            Brandings: {
                url: body.brandId
            }
        },
        include: {
            Brandings: true
        }
    });
    return NextResponse.json(result);
}