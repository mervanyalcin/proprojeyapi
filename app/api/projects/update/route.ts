

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await prisma.projects.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            photoLinks: body.images,
            description: body.description,
            cityId: body.cityId,
            countyId: body.countyId,
            brandingsId: body.brandingsId,
        },
    });
    return NextResponse.json(result);
}