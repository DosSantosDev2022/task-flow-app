import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Verificar autenticação e obter sessão
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')

    // Adiciona um log para verificar o token
    console.log('Token recebido:', token)

    if (!token) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 401 },
      )
    }

    const userId = token

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Erro ao buscar tasks', error)
    return NextResponse.json({ error: 'Erro ao buscar tasks' }, { status: 500 })
  }
}
