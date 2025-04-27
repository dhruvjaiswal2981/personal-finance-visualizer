import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log('Received data:', data); 
  
    const category = await prisma.category.create({ data });
    return NextResponse.json(category);
  }
  
