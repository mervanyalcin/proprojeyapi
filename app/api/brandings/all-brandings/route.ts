import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: NextRequest) {
    const result = await prisma.brandings.findMany();


    return NextResponse.json(result);
}