import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
type ProjectPriorityType = 'ALTA' | 'MEDIA' | 'BAIXA'
type StatusProjectType = 'TODOS' | 'FINALIZADOS' | 'PENDENTES'

// Lista de campos válidos para ordenação no modelo Project
const validSortFields: Array<keyof Prisma.ProjectOrderByWithRelationInput> = [
  'title', // Verifique se esse campo existe no seu modelo Prisma
  'priority', // Verifique se esse campo existe no seu modelo Prisma
  'startDate', // Verifique se esse campo existe no seu modelo Prisma
  // Adicione outros campos que são ordenáveis no modelo `Project`
]

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const priority = searchParams.get('priority') || ''
    const status = searchParams.get('status') || ''
    const sort = searchParams.get('sort') || 'asc'
    const sortBy = searchParams.get('sortBy') || 'startDate'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Verificar autenticação e obter sessão
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    console.log(token)
    /* Verifica se SessionUserId existe, se não existir retorna erro */
    if (!token) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 401 },
      )
    }
    const validPriorities: ProjectPriorityType[] = ['ALTA', 'MEDIA', 'BAIXA']
    const isValidPriority = validPriorities.includes(
      priority as ProjectPriorityType,
    )

    const validStatus: StatusProjectType[] = [
      'TODOS',
      'PENDENTES',
      'FINALIZADOS',
    ]
    const isValidStatus = validStatus.includes(status as StatusProjectType)

    // Montar a condição dinamicamente
    const whereCondition: Prisma.ProjectWhereInput = {
      userId: token,
      title: {
        contains: search,
        mode: 'insensitive',
      },
    }

    if (isValidStatus && status !== 'TODOS') {
      whereCondition.status = status as StatusProjectType
    }

    if (isValidPriority) {
      whereCondition.priority = priority as ProjectPriorityType
    }

    // Verifique se `sortBy` é um campo de ordenação válido
    const orderByCondition: Prisma.ProjectOrderByWithRelationInput = {}
    if (
      validSortFields.includes(
        sortBy as keyof Prisma.ProjectOrderByWithRelationInput,
      )
    ) {
      orderByCondition[sortBy as keyof Prisma.ProjectOrderByWithRelationInput] =
        sort === 'desc' ? 'desc' : 'asc'
    } else {
      // Defina um valor de fallback caso `sortBy` seja inválido
      orderByCondition.startDate = 'asc' // Supondo que 'startDate' exista
    }

    // Buscar projetos com filtros e ordenação
    const projects = await prisma.project.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: orderByCondition,
      include: {
        client: true,
      },
    })

    const totalProjects = await prisma.project.count({
      where: whereCondition,
    })

    return NextResponse.json({ projects, totalProjects }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 },
    )
  }
}
