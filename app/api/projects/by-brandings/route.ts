import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await prisma.projects.findMany({
        where: {
            Brandings: {
                id: "673ebfe7b7dce1b327194dbb"
            }
        }
    });
    return NextResponse.json(result);
}