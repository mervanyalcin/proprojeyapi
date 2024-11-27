import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const result = await prisma.dealer.findMany();
    return NextResponse.json(result);
}