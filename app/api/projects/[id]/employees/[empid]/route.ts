import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { employeeId } = await request.json()
    const projectEmployee = await prisma.projectEmployee.create({
      data: {
        projectId: params.id,
        employeeId,
      },
    })
    return NextResponse.json(projectEmployee)
  } catch (error) {
    return NextResponse.json({ error: 'Error assigning employee' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string, empid: string }> }
) {
  const params = await props.params;

  const {
    empid: employeeId
  } = params;

  try {
    await prisma.projectEmployee.delete({
      where: {
        projectId_employeeId: {
          projectId: params.id,
          employeeId,
        },
      },
    })
    return NextResponse.json({ message: 'Employee removed successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error removing employee' }, { status: 500 })
  }
} 