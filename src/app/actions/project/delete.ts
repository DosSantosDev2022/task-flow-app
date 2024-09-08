'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProjectAction(id: string) {
  try {
    const projectExists = await prisma.project.findUnique({
      where: { id },
    })

    if (!projectExists) {
      throw new Error('Projeto não existe no banco de dados')
    }

    await prisma.project.delete({
      where: { id },
    })
    revalidatePath('/projects')

    return { message: 'Projeto deletado com suceso' }
  } catch (err) {
    console.error('Erro ao deletar projeto:', err)
  }
}
