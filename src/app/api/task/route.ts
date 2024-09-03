// src/app/api/task/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Definindo o tipo para os dados que esperamos no corpo da requisição
interface TaskToUpdate {
  id: string
  status: 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'
}

// Definindo o tipo para a estrutura esperada do corpo da requisição
interface RequestBody {
  tasksToUpdate: TaskToUpdate[]
}

// Exportando a função POST como named export
export async function POST(req: NextRequest) {
  try {
    const { tasksToUpdate }: RequestBody = await req.json()
    console.log('Received tasksToUpdate:', tasksToUpdate)
    await Promise.all(
      tasksToUpdate.map(({ id, status }) =>
        prisma.task.update({
          where: { id },
          data: { status },
        }),
      ),
    )

    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.error('Error updating task statuses:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the task status' },
      { status: 500 },
    )
  }
}
