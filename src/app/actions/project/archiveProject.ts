'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { ProjectStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

interface updateProjectStatusProps {
  id: string
  newStatus: ProjectStatus
}

export async function ArchiveProject({
  id,
  newStatus,
}: updateProjectStatusProps) {
  try {
    // Obter a sessão diretamente no server
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autenticado')
    }

    const userId = session.user.id

    // Atualizar o projeto
    await prisma.project.update({
      where: { id },
      data: {
        userId,
        status: newStatus,
      },
    })

    revalidatePath('/projects')
    revalidatePath('/tasks')

    return { success: true } // Retorne um objeto de sucesso
  } catch (error) {
    console.error('Erro ao arquivar  o  projeto:', error)
    throw new Error('Erro ao arquivar  o  projeto')
  }
}
