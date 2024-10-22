'use server'
import { FormDataProject } from '@/@types/ZodSchemas/FormSchemaProject'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function updateProjectAction(formData: FormDataProject) {
  try {
    // Obter a sessão diretamente no server
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autenticado')
    }

    const userId = session.user.id

    const updateProject = await prisma.project.update({
      where: { id: formData.id },
      data: {
        userId,
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
    return updateProject
  } catch (error) {
    console.error('Erro ao atualizar o projeto:', error)
    throw new Error('Erro ao atualizar o projeto')
  }
}
