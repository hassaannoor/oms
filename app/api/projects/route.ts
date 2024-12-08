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
        manager: {
            connect: body.managerId
        },
        // clientId: body.clientId,
        client: {
            connect: body.clientId
        },
        // departmentId: body.departmentId,
        department: {
            connect: body.departmentId
        },
        paymentMade: body.paymentMade,
      }
    })
    return NextResponse.json(project)
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating project' }, { status: 500 })
//   }
}

