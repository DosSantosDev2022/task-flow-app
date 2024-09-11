import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
/* import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route' */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
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
    const projects = await prisma.project.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        client: true
      }
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
