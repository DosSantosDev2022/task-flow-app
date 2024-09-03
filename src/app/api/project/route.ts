import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany()
      return NextResponse.json(projects, { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar projetos' },
        { status: 500 },
      )
    }
  }
}
