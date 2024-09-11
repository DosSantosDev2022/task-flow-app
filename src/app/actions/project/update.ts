'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UpdateProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  price: z.string(),
  payment: z.enum(['DINHEIRO', 'CREDITO', 'DEBITO', 'PIX']),
  status: z.enum(['TODOS', 'FINALIZADOS', 'PENDENTES']),
  userId: z.string(),
  priority: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
})

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>

export async function updateProjectAction(formData: UpdateProjectInput) {
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
      },
    })
    revalidatePath('/projects')
    return updateProject
  } catch (error) {
    console.error('Erro ao atualizar o projeto:', error)
    throw new Error('Erro ao atualizar o projeto')
  }
}
