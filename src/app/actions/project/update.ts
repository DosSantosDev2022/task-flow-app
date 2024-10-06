'use server'
import { FormDataProject } from '@/@types/FormSchemas/FormSchemaProject'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProjectAction(formData: FormDataProject) {
  try {
    const updateProject = await prisma.project.update({
      where: { id: formData.id },
      data: {
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        price: parseFloat(formData.price),
        payment: formData.payment,
        status: formData.status,
        userId: formData.userId,
        priority: formData.priority,
        clientId: formData.clientId,
      },
    })
    revalidatePath('/projects')
    return updateProject
  } catch (error) {
    console.error('Erro ao atualizar o projeto:', error)
    throw new Error('Erro ao atualizar o projeto')
  }
}
