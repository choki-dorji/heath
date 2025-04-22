import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const savedFaqs = await prisma.savedFaq.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc', // Optional: order by creation date
      },
      // Include related question details if necessary
      // include: { 
      //   question: true 
      // }
    })

    return NextResponse.json(savedFaqs)
  } catch (error) {
    console.error('Error fetching saved FAQs:', error)
    return NextResponse.json(
      { error: 'Something went wrong while fetching saved FAQs' },
      { status: 500 }
    )
  }
} 