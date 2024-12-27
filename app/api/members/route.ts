import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const memberType = url.searchParams.get('memberType'); // Get the memberType from query params

  try {
    const members = await prisma.member.findMany({
      where: memberType ? { memberType } : {}, // Filter by memberType if provided
      orderBy: [
        {
          user: {
            position: 'asc',
          },
        },
        {
          user: {
            position: 'desc',
          },
        },
      ],
      include: {
        user: {
          select: {
            username: true,
            position: true,
          },
        },
      },
    })
    // Custom ordering to ensure CEO is at the top
    const ceoMembers = members.filter(member => member.user.position === 'CEO');
    const otherMembers = members.filter(member => member.user.position !== 'CEO');
    const orderedMembers = ceoMembers.concat(otherMembers);
    return NextResponse.json(orderedMembers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

export async function POST(request: Request) {
    try {
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
        // Optional fields based on memberType
        ...(body.memberType === "EMPLOYEE" && body.managerId ? { managerId: body.managerId } : {}),
        // Create the associated user
        user: {
          create: {
            username: body.email,
            password: body.password, // Note: Should be hashed in production
            position: body.memberType,
          },
        },
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
    });

    // if (!member) return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
    
    return NextResponse.json(member)
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
    }
}

