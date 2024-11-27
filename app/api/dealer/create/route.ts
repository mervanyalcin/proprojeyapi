import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await prisma.dealer.create({
        data: {
            fullName: body.fullName,
            companyName: body.companyName,
            address: body.address,
            phoneNumber: body.phoneNumber,
            email: body.email
        },
    });
    return NextResponse.json(result);
}