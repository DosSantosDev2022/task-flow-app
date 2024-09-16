'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProjectAction(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    })
    revalidatePath('/projects')

    return { message: 'Projeto deletado com sucesso' }
  } catch (err) {
    console.error('Erro ao deletar projeto:', err)
  }
}
