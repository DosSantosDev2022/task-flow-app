'use server'
import { prisma } from '@/lib/prisma'
import { FormDataProject } from '@/@types/FormSchemas/FormSchemaProject'
import { revalidatePath } from 'next/cache'

export async function createProjectAction(formData: FormDataProject) {
  try {
    // Gera um slug com base no titulo do projeto
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
    // Criar o projeto no banco de dados
    const project = await prisma.project.create({
      data: {
        slug,
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
    return project
  } catch (error) {
    console.error('Erro ao criar o projeto:', error)
    throw new Error('Erro ao criar o projeto')
  }
}
