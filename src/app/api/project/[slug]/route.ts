import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    // Buscar o projeto pelo slug
    const slug = params.slug
    const project = await prisma.project.findUnique({
      where: { slug },
    })

    console.log('Slug:', slug)
    console.log('Project:', project)

    if (!project) {
      return NextResponse.json(
        { error: 'Página de projeto não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar o projeto', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
