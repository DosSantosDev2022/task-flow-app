import { Project, Client, Task, TaskStatus } from '@prisma/client'
import { Session } from 'next-auth'
import { calculateProgress } from '@/utils/calculateProgress' // Certifique-se de importar a função corretamente
import { prisma } from '@/lib/prisma'

interface getProjectsParams {
  page?: number
  limit?: number
  session?: Session | null
  search?: string
  priority?: string
  status?: string
  sort?: string
  sortBy?: string
}

export interface ProjectData extends Project {
  client: Client
  tasks: Task[]
  progress: number // Adiciona o campo de progresso
}

interface ProjectsResponse {
  projects: ProjectData[]
  totalProjects: number
}

export async function getProjects({
  page = 1,
  limit = 10,
  session = null,
  search = '',
  priority = '',
  status = '',
  sort = '',
  sortBy = '',
}: getProjectsParams): Promise<ProjectsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    // Construa a URL de consulta dinamicamente
    const queryParams = new URLSearchParams({
      search: search ?? '',
      priority: priority ?? '',
      status: status ?? '',
      sort: sort ?? '',
      sortBy: sortBy ?? '',
      page: page?.toString() ?? '1',
      limit: limit?.toString() ?? '10',
    }).toString()

    /* Fetch para buscar os dados da API */
    const res = await fetch(`${baseUrl}/api/projects?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id ?? ''}`,
      },
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar projetos')
    }

    const { projects, totalProjects } = await res.json()

    // Calcule o progresso de cada projeto
    const projectsWithProgress = await Promise.all(
      projects.map(async (project: ProjectData) => {
        const tasks = await prisma.task.findMany({
          where: { projectId: project.id },
        })

        const tasksRecord = tasks.reduce(
          (acc, task) => {
            acc[task.id] = task.status
            return acc
          },
          {} as Record<string, TaskStatus>,
        )

        const progress = calculateProgress(tasksRecord)

        return { ...project, tasks, progress }
      }),
    )

    return { projects: projectsWithProgress, totalProjects }
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return { projects: [], totalProjects: 0 }
  }
}
