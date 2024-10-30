// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Client } from '@prisma/client'

interface QueryParams {
  search?: string
  page?: string
  limit?: string
  sort?: string // Prisma tem tipos para sort (asc, desc)
  sortBy?: keyof Client // Você pode restringir a propriedades específicas do modelo Client
  state?: string
  city?: string
}

export async function GET(req: NextRequest) {
  const params: QueryParams = Object.fromEntries(req.nextUrl.searchParams)

  try {
    const pageNumber = parseInt(params.page || '1', 10)
    const pageSize = parseInt(params.limit || '10', 10)
    const skip = (pageNumber - 1) * pageSize
    const orderBy: Record<string, string> = {}
    orderBy[params.sortBy || 'createdAt'] = params.sort || 'asc'

    // Verificar autenticação e obter sessão
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 401 },
      )
    }

    const userId = token

    const whereClause: {
      userId: string
      name?: { contains: string; mode: 'insensitive' }
      state?: { equals: string }
      city?: { equals: string }
    } = {
      userId,
      ...(params.search
        ? { name: { contains: params.search, mode: 'insensitive' } }
        : {}),
      ...(params.state ? { state: { equals: params.state } } : {}),
      ...(params.city ? { city: { equals: params.city } } : {}),
    }

    // Buscando clientes e total de clientes com base nos parâmetros fornecidos
    const [clients, totalClients] = await Promise.all([
      prisma.client.findMany({
        where: whereClause,
        include: {
          projects: true,
        },
        skip,
        take: pageSize,
        orderBy,
      }),
      prisma.client.count({
        where: whereClause,
      }),
    ])

    return NextResponse.json({ clients, totalClients })
  } catch (error) {
    console.error('Erro ao buscar todos os dados:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar todos os dados' },
      { status: 500 },
    )
  }
}
