import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Update a transaction by ID
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const data = await req.json();
  
  // Await params to access its properties
  const { id } = await params; 
  const transactionId = parseInt(id, 10); // Use the awaited id

  // Validate the ID
  if (isNaN(transactionId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data,
    });

    return NextResponse.json(transaction);
  } catch {
    return NextResponse.json({ error: 'Transaction not found or other error' }, { status: 404 });
  }
}

// Delete a transaction by ID
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Await params to access its properties
  const { id } = await params; 
  const transactionId = parseInt(id, 10); // Use the awaited id

  // Validate the ID
  if (isNaN(transactionId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.transaction.delete({
      where: { id: transactionId },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Transaction not found or other error' }, { status: 404 });
  }
}
