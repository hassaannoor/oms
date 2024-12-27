import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
      include: {
        employee: true
      }
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
      return NextResponse.json(existingAssignment);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error assigning employee' }, { status: 500 });
  }
}
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const projectEmployees = await prisma.projectEmployee.findMany({
        where: { projectId: params.id },
        include: { employee: true }, // Include employee details if needed
    });
    return NextResponse.json(projectEmployees);
}