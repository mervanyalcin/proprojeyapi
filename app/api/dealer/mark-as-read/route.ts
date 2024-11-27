import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id } = await req.json();
    const result = await prisma.dealer.update({
        where: {
            id: id,
        },
        data: {
            isReaded: true,
        },
    });
    return NextResponse.json(result);
}