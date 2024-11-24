import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function POST(req: Request) {
    const body = await req.json();
    const { name, color } = body; 

    const result = await prisma.brandings.create({
        data: {
            name: name,
            color: color
        }
    });
    return NextResponse.json(result);
} 