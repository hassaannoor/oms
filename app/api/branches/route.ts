import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        head: true, // Include head details if needed
      },
    });
    return NextResponse.json(branches);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching branches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const branch = await prisma.branch.create({
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
    return NextResponse.json({ error: 'Error creating branch' }, { status: 500 });
  }
}