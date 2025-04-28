// app/api/budgets/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { month: 'desc' }
    });
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('GET /api/budgets error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validation
    if (!data.category || !data.month || data.amount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const monthDate = new Date(data.month);
    if (isNaN(monthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    const budget = await prisma.budget.upsert({
      where: {
        category_month_unique: {
          category: data.category,
          month: monthDate,
        }
      },
      update: { 
        amount: data.amount,
        updatedAt: new Date() 
      },
      create: {
        category: data.category,
        month: monthDate,
        amount: data.amount,
      }
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.error('POST /api/budgets error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}