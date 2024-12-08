import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: {
        user: {
          select: {
            username: true,
            position: true,
          },
        },
      },
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

export async function POST(request: Request) {
//   try {
    const body = await request.json()
    
    // Create the member with proper schema alignment
    const member = await prisma.member.create({
      data: {
        name: body.name,
        email: body.email,
        phoneNo: body.phoneNo,
        cnic: body.cnic,
        salary: parseFloat(body.salary),
        memberType: body.memberType,
        // Create the associated user
        user: {
          create: {
            username: body.email,
            password: body.password, // Note: Should be hashed in production
            position: body.memberType,
          },
        },
        // Optional fields based on memberType
        ...(body.memberType === "EMPLOYEE" && body.managerId
          ? { managerId: body.managerId }
          : {}),
      },
      // Include the created user in the response
      include: {
        user: {
          select: {
            username: true,
            position: true,
          },
        },
      },
    })
    
    return NextResponse.json(member)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
//   }
}

