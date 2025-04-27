import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const budgets = await prisma.budget.findMany();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const budget = await prisma.budget.upsert({
    where: {
      category_month: {
        category: data.category,
        month: new Date(data.month),  // Ensure correct Date format
      }
    },
    update: { amount: data.amount },
    create: {
      category: data.category,
      month: new Date(data.month),  // Ensure correct Date format
      amount: data.amount,
    }
  });

  return NextResponse.json(budget);
}
