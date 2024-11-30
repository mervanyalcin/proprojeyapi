import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { fullName, phoneNumber, message } = body 


    const result = await prisma.messages.create({
        data: {
            fullName: fullName,
            phoneNumber: phoneNumber,
            message: message,
        },
    });
    return NextResponse.json(result);
}