import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
//   try {
    const departments = await prisma.department.findMany({
      include: {
        head: true,
        branch: true,
        projects: true
      }
    })
    return NextResponse.json(departments)
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 })
//   }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const department = await prisma.department.create({
      data: body,
      include: {
        head: true,
        branch: true,
        projects: true
      }
    })
    return NextResponse.json(department)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 })
  }
}

