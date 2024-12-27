import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
//   try {
    // Ensure params.id exists
    const id = await params;
    if (!id) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 })
    }

    const body = await request.json()
    
    // Update the member
    const updatedMember = await prisma.member.update({
      where: { 
        id: await Promise.resolve(id) // Await the dynamic parameter
      },
      data: {
        name: body.name,
        email: body.email,
        phoneNo: body.phoneNo,
        cnic: body.cnic,
        salary: parseFloat(body.salary),
        memberType: body.memberType,
        // Optional fields based on memberType
        ...(body.memberType === "EMPLOYEE"
          ? { managerId: body.managerId || null }
          : { managerId: null }
        ),
        // Update the associated user
        user: {
          update: {
            username: body.email,
            position: body.memberType,
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            position: true,
          },
        },
      },
    })

    return NextResponse.json(updatedMember)
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to update member' },
//       { status: 500 }
//     )
//   }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // Ensure params.id exists
    if (!params?.id) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 })
    }

    const memberId = await Promise.resolve(params.id) // Await the dynamic parameter

    // First, get the member to find the associated user
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      select: { userId: true }
    })

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    // Delete the member (this will cascade to related records based on schema)
    await prisma.member.delete({
      where: { id: memberId },
    })

    // Delete the associated user
    await prisma.user.delete({
      where: { id: member.userId },
    })

    return NextResponse.json({ message: 'Member deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete member' },
      { status: 500 }
    )
  }
} 