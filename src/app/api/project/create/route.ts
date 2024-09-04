import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, Project } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(authOptions)

      if (!session?.user?.id) {
        return NextResponse.json(
          {
            error: 'Você deve estar logado para criar um projeto.',
          },
          { status: 401 },
        )
      }
      const data: Project = await req.json()
      const { title, description, startDate, endDate, price, payment } = data

      if (
        !title ||
        !description ||
        !startDate ||
        !endDate ||
        !price ||
        !payment
      ) {
        return NextResponse.json({
          error: 'Todos os campos são obrigatórios.',
        })
      }
      const project = await prisma.project.create({
        data: {
          title,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          price: data.price,
          payment,
          user: { connect: { id: session.user.id } },
        },
      })
      return NextResponse.json(project, { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      )
    }
  }
}
