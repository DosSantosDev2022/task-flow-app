'use server'
import { FormDataClient } from '@/@types/ZodSchemas/FormSchemaClients'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function updateClientAction(formData: FormDataClient) {
  // Obter a sessão diretamente no server
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.id) {
    throw new Error('Usuário não autenticado')
  }

  const userId = session.user.id

  try {
    const updateProject = await prisma.client.update({
      where: { id: formData.id },
      data: {
        userId,
        name: formData.name,
        email: formData.email,
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
