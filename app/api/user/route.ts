import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prismadb";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

async function getSession() {
  return await getServerSession(authOptions)
}
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (session === null) {
    return NextResponse.json(null);
  }
  const result = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    select: {
      email: true,
      name: true,
      surname: true,
      phoneNumber: true
    }
  })
  return NextResponse.json(result);
}

