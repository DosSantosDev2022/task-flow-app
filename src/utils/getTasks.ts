import { TaskResponse } from '@/@types/task'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function getTasks(): Promise<TaskResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    const session = await getServerSession(authOptions)

    const response = await fetch(`${baseUrl}/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id ?? ''}`, // Use o id do usuário da sessão
      },
    })

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar tarefas: ${response.status} ${response.statusText}`,
      )
    }

    const tasks = await response.json()

    return tasks
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
    return { tasks: [] }
  }
}
