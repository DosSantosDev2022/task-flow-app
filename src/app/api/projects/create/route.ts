import { NextRequest, NextResponse } from 'next/server'
import { Payment } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    // Obtém a sessão do servidor
    const session = await getServerSession(authOptions)
    // Verifica se o usuário está autenticado
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: 'Você deve estar logado para criar um projeto.',
        },
        { status: 401 },
      )
    }

    // Obtém os dados do corpo da requisição
    const data = await req.json()
    const { title, description, startDate, endDate, price, payment } = data
    // Valida os dados recebidos
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !price ||
      !payment ||
      !Object.values(Payment).includes(payment)
    ) {
      return NextResponse.json(
        {
          error: 'Todos os campos são obrigatórios.',
        },
        { status: 400 },
      )
    }
    // Gera um slug com base no titulo do projeto
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    // Converte os dados para o formato esperado
    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: data.price,
        payment: payment as Payment,
        user: { connect: { id: session.user.id } },
      },
    })

    revalidatePath('/projects')
    // Retorna o projeto criado com sucesso
    return NextResponse.json(project, { status: 200 })

    // Captura um erro caso não seja possível criar um projeto
  } catch (errors) {
    return NextResponse.json(
      { error: 'Internal Server Error', errors },
      { status: 500 },
    )
  }
}
