import { createProjectAction } from '@/app/actions/project/create'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Extrair o JSON do corpo da requisição
    const {
      description,
      endDate,
      payment,
      price,
      startDate,
      status,
      title,
      userId,
    } = await req.json()

    // Passar os dados para a função de criação do projeto
    const project = await createProjectAction({
      description,
      endDate,
      payment,
      price,
      startDate,
      status,
      title,
      userId,
    })

    // Retornar a resposta com o projeto criado
    return NextResponse.json({ message: 'SUCESSO', project }, { status: 200 })
  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    return NextResponse.json(
      { message: 'Erro ao criar projeto', error },
      { status: 400 },
    )
  }
}
