import { TaskResponse } from '@/@types/task'
import { Session } from 'next-auth'

interface getTasksProps {
  session: Session | null
}

export async function getTasks({
  session,
}: getTasksProps): Promise<TaskResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

    const response = await fetch(`${baseUrl}/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id ?? ''}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar clientes: ${response.status} ${response.statusText}`,
      )
    }

    const tasks = await response.json()

    return tasks
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return { tasks: [] }
  }
}
