'use server'

import { prisma } from '@/lib/prisma'
import { TaskStatus } from '@prisma/client'

interface TaskToUpdate {
  id: string
  status: TaskStatus
}

export async function saveTaskStatuses(tasksToUpdate: TaskToUpdate[]) {
  try {
    const updatePromises = tasksToUpdate.map((task) =>
      prisma.task.update({
        where: { id: task.id },
        data: { status: task.status },
      }),
    )
    await Promise.all(updatePromises)
    console.log(updatePromises)
  } catch (error) {
    console.error('Erro ao alterar status das tarefas, verifique:', error)
    throw new Error('Erro ao alterar status das tarefas')
  }
}
