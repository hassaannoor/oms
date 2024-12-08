import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const clients = await prisma.client.findMany(); // Fetch all clients
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
//   try {
    const body = await request.json();
    const client = await prisma.client.create({
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
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating client' }, { status: 500 });
//   }
} 