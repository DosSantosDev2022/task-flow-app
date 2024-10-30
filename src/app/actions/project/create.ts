'use server'
import { prisma } from '@/lib/prisma'
import { FormDataProject } from '@/@types/ZodSchemas/FormSchemaProject'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function createProjectAction(formData: FormDataProject) {
  try {
    // Obter a sessão diretamente no server
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autenticado')
    }

    const userId = session.user.id

    // Gera um slug com base no titulo do projeto
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
    // Criar o projeto no banco de dados
    const project = await prisma.project.create({
      data: {
        userId,
        slug,
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        price: parseFloat(formData.price),
        payment: formData.payment,
        status: formData.status,
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
