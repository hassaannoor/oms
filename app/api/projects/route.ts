import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
//   try {
    const body = await request.json()
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        budget: body.budget,
        status: body.status,
        // managerId: body.managerId,
        manager: body.managerId ? {
            connect: body.managerId
        } : undefined,
        // clientId: body.clientId,
        client: body.clientId ? {
            connect: body.clientId
        } : undefined,
        // departmentId: body.departmentId,
        department: body.departmentId ? {
            connect: body.departmentId
        } : undefined,
        paymentMade: body.paymentMade,
      }
    })
    return NextResponse.json(project)
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating project' }, { status: 500 })
//   }
}

