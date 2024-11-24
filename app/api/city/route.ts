import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
    const result = await prisma.city.findMany({
    	include: {
    		counties: true
    	}
    });
    return NextResponse.json(result);
}
