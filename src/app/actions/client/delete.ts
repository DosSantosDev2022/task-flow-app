'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteClientAction(id: string) {
  try {
    await prisma.client.delete({
      where: { id },
    })
    revalidatePath('/clients')

    return { message: 'Cliente deletado com sucesso' }
  } catch (err) {
    console.error('Erro ao deletar cliente:', err)
  }
}
