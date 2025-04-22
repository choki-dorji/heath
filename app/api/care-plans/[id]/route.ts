import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // // const session = await getServerSession(authOptions)
    // // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const carePlan = await prisma.carePlan.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!carePlan) {
      return NextResponse.json({ error: 'Care plan not found' }, { status: 404 })
    }

    // if (carePlan.userId !== session.user.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    await prisma.carePlan.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Care plan deleted successfully' })
  } catch (error) {
    console.error('Error deleting care plan:', error)
    return NextResponse.json(
      { error: 'Failed to delete care plan' },
      { status: 500 }
    )
  }
} 


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) { 
  const carePlan = await prisma.carePlan.findUnique({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json({ data: carePlan })
}