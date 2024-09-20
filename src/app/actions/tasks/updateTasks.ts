'use server'

import { prisma } from '@/lib/prisma'
import { Task } from '@prisma/client'

export async function updateTasksAction(tasksToUpdate: Task[]) {
  try {
    const updatePromises = tasksToUpdate.map((task) =>
      prisma.task.update({
        where: { id: task.id },
        data: {
          title: task.title,
          description: task.description,
          status: task.status,
          startDate: task.startDate,
          endDate: task.endDate,
          projectId: task.projectId,
          userId: task.userId,
        },
      }),
    )
    await Promise.all(updatePromises)
    console.log(updatePromises)
  } catch (error) {
    console.error('Erro ao alterar status das tarefas, verifique:', error)
    throw new Error('Erro ao alterar status das tarefas')
  }
}
