import { NextRequest, NextResponse } from 'next/server'
import { Client, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // Obtém a sessão do usuário
    const session = await getServerSession(authOptions)

    // Verifica se o usuário está autenticado
    if (!session?.user.id) {
      return NextResponse.json(
        {
          error: 'Você precisa estar logado para cadastrar um cliente',
        },
        { status: 401 },
      )
    }

    // Obtém os dados do corpo da requisição
    const data: Client = await req.json()
    const {
      id,
      name,
      phone,
      address,
      city,
      country,
      email,
      postalCode,
      state,
    } = data

    if (
      !id ||
      !name ||
      !phone ||
      !address ||
      !city ||
      !country ||
      !email ||
      !postalCode ||
      !postalCode
    ) {
      return NextResponse.json(
        {
          error: 'Todos os campos são obrogatórios',
        },
        { status: 400 },
      )
    }

    const client = await prisma.client.create({
      data: {
        id,
        name,
        email,
        address,
        city,
        country,
        phone,
        postalCode,
        state,
        user: { connect: { id: session.user.id } },
      },
    })

    // Retorna o cliente cadastrado com sucesso
    return NextResponse.json(client, { status: 200 })
  } catch (errors) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        errors,
      },
      { status: 500 },
    )
  }
}
