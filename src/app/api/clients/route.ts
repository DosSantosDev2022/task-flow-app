// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { search, page, limit, sort, sortBy } = Object.fromEntries(
    req.nextUrl.searchParams,
  )

  try {
    const pageNumber = parseInt(page as string, 10) || 1
    const pageSize = parseInt(limit as string, 10) || 10
    const skip = (pageNumber - 1) * pageSize
    const orderBy: any = {}
    orderBy[(sortBy as string) || 'createdAt'] = sort || 'asc'

    // Verificar autenticação e obter sessão
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    console.log(token)

    if (!token) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 401 },
      )
    }

    const userId = token

    const whereClause: any = {
      userId,
      ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
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
