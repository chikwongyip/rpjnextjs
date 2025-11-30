import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    if (key) {
      const info = await prisma.companyInfo.findUnique({
        where: { key }
      });
      return NextResponse.json(info);
    }
    const allInfo = await prisma.companyInfo.findMany();
    return NextResponse.json(allInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company info' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const info = await prisma.companyInfo.upsert({
      where: { key: body.key },
      update: { content: body.content },
      create: {
        key: body.key,
        content: body.content
      }
    });
    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save company info' },
      { status: 500 }
    );
  }
}
