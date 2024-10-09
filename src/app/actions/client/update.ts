'use server'
import { FormDataClient } from '@/@types/ZodSchemas/FormSchemaClients'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateClientAction(formData: FormDataClient) {
  try {
    const updateProject = await prisma.client.update({
      where: { id: formData.id },
      data: {
        name: formData.name,
        email: formData.email,
        userId: formData.userId,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        projects: formData.project,
      },
    })
    revalidatePath('/clients')
    return updateProject
  } catch (error) {
    console.error('Erro ao atualizar o cliente:', error)
    throw new Error('Erro ao atualizar o cliente')
  }
}
