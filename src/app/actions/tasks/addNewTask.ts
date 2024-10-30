'use server'
import {
  FormTaskSchema,
  TaskFormData,
} from '@/@types/ZodSchemas/FormSchemaTasks'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProjectStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function addNewTaskAction(dataTask: TaskFormData) {
  try {
    // Obter a sessão diretamente no server
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autenticado')
    }

    const userId = session.user.id

    const validatedData = FormTaskSchema.parse(dataTask)

    // Criar a task vinculada a um projectId
    const newTask = await prisma.task.create({
      data: {
        ...validatedData,
        userId,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        projectId: validatedData.projectId,
      },
    })

    const project = await prisma.project.findUnique({
      where: {
        id: dataTask.projectId,
      },
      select: { status: true },
    })

    if (project?.status === ProjectStatus.CONCLUIDO) {
      await prisma.project.update({
        where: { id: dataTask.projectId },
        data: { status: ProjectStatus.PENDENTE },
      })
    }

    revalidatePath('/tasks')

    return newTask
  } catch (error) {
    console.error('Erro ao adicionar nova tarefa:', error)
  }
}
