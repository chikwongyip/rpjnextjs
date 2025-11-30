import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  try {
    const where = productId ? { productId } : {};
    const attachments = await prisma.attachment.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(attachments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attachments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const attachment = await prisma.attachment.create({
      data: {
        name: body.name,
        url: body.url,
        productId: body.productId
      }
    });
    return NextResponse.json(attachment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create attachment' },
      { status: 500 }
    );
  }
}
