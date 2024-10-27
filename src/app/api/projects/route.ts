// app/api/all-data/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Definindo os possíveis valores para status e prioridade
const VALID_STATUSES = ['PENDENTE', 'CONCLUIDO', 'ARQUIVADO', 'TODOS']
const VALID_PRIORITIES = ['ALTA', 'MEDIA', 'BAIXA']

export async function GET(req: NextRequest) {
  const { search, page, limit, sort, sortBy, status, priority } =
    Object.fromEntries(req.nextUrl.searchParams)

  try {
    const pageNumber = parseInt(page as string, 10) || 1
    const pageSize = parseInt(limit as string, 10) || 10
    const skip = (pageNumber - 1) * pageSize
    const orderBy: any = {}
    orderBy[(sortBy as string) || ''] = sort || 'asc'

    // Verificar autenticação e obter sessão
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')

    /* Verifica se SessionUserId existe, se não existir retorna erro */
    if (!token) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 401 },
      )
    }
    const userId = token
    // Verificar e converter os valores de status e prioridade para garantir que sejam válidos
    const projectStatus = VALID_STATUSES.includes(status as string)
      ? status
      : undefined
    const projectPriority = VALID_PRIORITIES.includes(priority as string)
      ? priority
      : undefined

    const whereClause: any = {
      userId,
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
      ...(projectStatus ? { status: projectStatus } : {}),
      ...(projectPriority ? { priority: projectPriority } : {}),
    }

    const [projects, totalProjects] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        include: {
          client: true, // Inclui o cliente relacionado
          tasks: true, // Inclui as tarefas relacionadas
        },
        skip,
        take: pageSize,
        orderBy,
      }),
      prisma.project.count({
        where: whereClause,
      }),
    ])

    return NextResponse.json({ projects, totalProjects })
  } catch (error) {
    console.error('Erro ao buscar todos os dados:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar todos os dados' },
      { status: 500 },
    )
  }
}
