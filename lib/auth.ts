import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(userId: string) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  return sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email }
    })
  } catch (error) {
    console.error('Error finding user by email:', error)
    throw error
  }
}

export async function createUser(email: string, password: string, name?: string) {
  try {
    const hashedPassword = await hashPassword(password)
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
} 