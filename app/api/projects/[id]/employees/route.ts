import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    // try {
      const { employeeId } = await request.json(); // Expecting an array of employee IDs
      const projectEmployee = await prisma.projectEmployee.create({
          data: {
            projectId: params.id,
            employeeId,
          },
        });
      return NextResponse.json(projectEmployee);
    // } catch (error) {
    //   return NextResponse.json({ error: 'Error assigning employees' }, { status: 500 });
    // }
  }