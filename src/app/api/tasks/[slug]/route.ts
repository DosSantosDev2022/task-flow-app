import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Rota para buscar tarefas
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    // busca projeto pelo slug...
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 },
      )
    }

    // busca tarefas vinculadas ao projeto

    const tasks = await prisma.task.findMany({
      where: {
        projectId: project.id,
      },
    })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Erro ao buscar as tarefas, verifique:', error)
    return NextResponse.json({ error: 'Internal Sever Error' }, { status: 500 })
  }
}
