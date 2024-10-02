import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const token = req.headers.get('Authorization')?.replace('Bearer', '')

  if (!token) {
    return NextResponse.json(
      { error: 'Id do usuário não fornecido' },
      { status: 401 },
    )
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado, verifique !' },
        { status: 404 },
      )
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Erro ao buscar projeto', error)
    return NextResponse.json(
      { error: 'Erro ao buscar projeto' },
      { status: 500 },
    )
  }
}
