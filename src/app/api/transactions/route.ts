import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const transaction = await prisma.transaction.create({ data });
  return NextResponse.json(transaction);
}
