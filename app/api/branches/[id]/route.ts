import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const branch = await prisma.branch.update({
      where: { id: params.id },
      data: {
        name: body.name,
        phoneNo: body.phoneNo,
        country: body.country,
        city: body.city,
        headId: body.headId,
      },
    });
    return NextResponse.json(branch);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating branch' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.branch.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting branch' }, { status: 500 });
  }
}