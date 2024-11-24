import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: NextRequest) {
    const result = await prisma.brandings.create({
        data: {
            name: "test",
            color: "#000000"
        }
    });
    return NextResponse.json(result);
}
