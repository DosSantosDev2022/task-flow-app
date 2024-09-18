import { Project, Client, Task } from '@prisma/client'
import { Session } from 'next-auth'

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
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''

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

    /* Fetch para buscar dos dados da api */
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

    return { projects, totalProjects }
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return { projects: [], totalProjects: 0 }
  }
}
