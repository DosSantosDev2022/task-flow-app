'use server'
import { FormTaskSchema, TaskFormData } from '@/@types/schemas/FormSchemaTasks'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addNewTaskAction(dataTask: TaskFormData) {
  try {
    console.log('Dados recebidos do form task', dataTask)

    const validatedData = FormTaskSchema.parse(dataTask)
    console.log(validatedData)

    // Criar a task vinculada a um projectId
    const newTask = await prisma.task.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        projectId: validatedData.projectId,
      },
    })
    revalidatePath('/tasks')
    console.log(newTask)
    return newTask
  } catch (error) {
    console.error('Erro ao adicionar nova tarefa:', error)
  }
}
