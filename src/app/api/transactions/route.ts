import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const amount = data.amount;
  const date = new Date(data.date);

  if (isNaN(amount) || !date.getTime()) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount: amount,  // amount is passed as a number
      date: date,
      description: data.description,
      category: data.category,
    },
  });

  return NextResponse.json(transaction);
}

