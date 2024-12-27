import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { employeeId } = await request.json(); // Expecting a single employee ID

    // Check if the ProjectEmployee already exists
    const existingAssignment = await prisma.projectEmployee.findUnique({
      where: {
        projectId_employeeId: {
          projectId: params.id,
          employeeId,
        },
      },
    });

    // If it doesn't exist, create a new assignment
    if (!existingAssignment) {
      const projectEmployee = await prisma.projectEmployee.create({
        data: {
          projectId: params.id,
          employeeId,
        },
      });
      return NextResponse.json(projectEmployee);
    } else {
      return NextResponse.json({ message: 'Employee is already assigned to this project.' }, { status: 409 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error assigning employee' }, { status: 500 });
  }
}
export async function GET(
    { params }: { params: { id: string } }
) {
    const projectEmployees = await prisma.projectEmployee.findMany({
        where: { projectId: params.id },
        include: { employee: true }, // Include employee details if needed
    });
    return NextResponse.json(projectEmployees);
}