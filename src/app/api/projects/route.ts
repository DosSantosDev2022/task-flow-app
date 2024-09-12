import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
/* import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route' */
type ProjectPriorityType = 'ALTA' | 'MEDIA' | 'BAIXA'
type StatusProjectType = 'TODOS' | 'FINALIZADOS' | 'PENDENTES'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const priority = searchParams.get('priority') || ''
    const status = searchParams.get('status') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Verificar autenticação e obter sessão
    /*  const session = await getServerSession(authOptions)

    console.log('Sessão obtida:', session)
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 },
      )
    }
 */
    // Obter ID do usuário da sessão
    /* const userId = session?.user.id */
    /* console.log('userId da seção', userId) */

    // Validar se o valor da prioridade é um dos aceitos
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
      title: {
        contains: search,
        mode: 'insensitive',
      },
    }

    if (isValidStatus) {
      whereCondition.status = status as StatusProjectType
    }

    if (isValidPriority) {
      whereCondition.priority = priority as ProjectPriorityType
    }

    const projects = await prisma.project.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        client: true,
      },
    })

    const totalProjects = await prisma.project.count({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    })

    return NextResponse.json({ projects, totalProjects }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 },
    )
  }
}
