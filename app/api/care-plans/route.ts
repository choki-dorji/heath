import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    console.log("dfata", session)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const carePlans = await prisma.carePlan.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return NextResponse.json(carePlans)
  } catch (error) {
    console.error('Error fetching care plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch care plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, conditions, medications } = await request.json()

    const carePlan = await prisma.carePlan.create({
      data: {
        name,
        description,
        conditions,
        medications,
        userId: session.user.id,
      },
    })

    return NextResponse.json(carePlan)
  } catch (error) {
    console.error('Error creating care plan:', error)
    return NextResponse.json(
      { error: 'Failed to create care plan' },
      { status: 500 }
    )
  }
} 