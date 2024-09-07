import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const projects = await prisma.project.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 },
    )
  }
}
