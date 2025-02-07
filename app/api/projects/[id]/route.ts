import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.project.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 })
  }
}
