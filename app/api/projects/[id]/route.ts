import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const project = await prisma.project.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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
  { params, employeeId }: { params: { id: string }, employeeId: string }
) {
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