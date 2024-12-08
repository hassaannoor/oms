import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const client = await prisma.client.update({
      where: { id: params.id }, // Update client by ID
      data: {
        name: body.name,
        signDate: body.signDate,
        netWorth: body.netWorth,
        phoneNo: body.phoneNo,
        email: body.email,
        address: body.address,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.client.delete({
      where: { id: params.id }, // Delete client by ID
    });
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting client' }, { status: 500 });
  }
} 