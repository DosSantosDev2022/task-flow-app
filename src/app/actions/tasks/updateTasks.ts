'use server'

import { prisma } from '@/lib/prisma'
import { Task } from '@prisma/client'

export async function updateTasksAction(tasksToUpdate: Task[]) {
  try {
    // Extraindo os IDs das tarefas que estamos tentando atualizar
    const tasksIds = tasksToUpdate.map((task) => task.id)

    // Buscando as tarefas que existem no banco de dados
    const existingTasks = await prisma.task.findMany({
      where: {
        id: { in: tasksIds },
      },
    })

    // Criando um conjunto para verificar a existência das tarefas
    const existingTaskIds = new Set(existingTasks.map((task) => task.id))

    // Filtrando apenas as tarefas que existem
    const tasksToUpdateValid = tasksToUpdate.filter((task) =>
      existingTaskIds.has(task.id),
    )

    // Atualizando apenas as tarefas que existem
    const updatePromises = tasksToUpdateValid.map((task) =>
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
          ...(task.status === 'CONCLUIDO' ? { completedDate: new Date() } : {}),
          deadlines: task.deadlines,
        },
      }),
    )
    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Erro ao alterar status das tarefas, verifique:', error)
    throw new Error('Erro ao alterar status das tarefas')
  }
}
