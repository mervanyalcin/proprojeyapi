
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
 
    const result = await prisma.brandings.delete({
        where: {
            id: body.id
        }
    })
 
    return NextResponse.json(result);

}