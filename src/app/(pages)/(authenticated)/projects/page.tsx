import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableItem,
  Table,
} from '@/components/global/table'
import { FilterProjects } from '@/components/pages/projects/filters/'
import { ProjectCreationForm } from '@/components/pages/projects/createdProject/ProjectCreationForm'
import { Pagination } from '@/components/global/pagination/pagination'
import { Client, Project, Task } from '@prisma/client'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { TableActions } from '@/components/pages/projects/tableActions/actions'
import { ProgressBar } from '@/components/global/progressBar'
import { MdOutlineTitle, MdPriorityHigh } from 'react-icons/md'
import {
  LuList,
  LuLoader2,
  LuRedoDot,
  LuCalendarDays,
  LuUser,
} from 'react-icons/lu'
import { RiProgress1Line } from 'react-icons/ri'
/* import { ProjectData } from '@/@types/prisma' */

// Definindo as cores de status e prioridade
const statusColors = {
  TODOS: 'bg-zinc-500',
  FINALIZADOS: 'bg-blue-500',
  PENDENTES: 'bg-red-500',
}

const priorityColors = {
  BAIXA: 'bg-green-500',
  MEDIA: 'bg-yellow-500',
  ALTA: 'bg-red-500',
}

interface ProjectData extends Project {
  client: Client
  tasks: Task[]
}

interface ProjectsResponse {
  projects: ProjectData[]
  totalProjects: number
}

async function getProjects(
  page: number,
  limit: number,
  session?: Session | null,
  search?: string,
  priority?: string,
  status?: string,
  sort?: string,
  sortBy?: string,
): Promise<ProjectsResponse> {
  try {
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''
    const res = await fetch(
      `${baseUrl}/api/projects?search=${search}&priority=${priority}&status=${status}&sort=${sort}&${sortBy}$&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.id}`,
        },
        cache: 'no-cache',
      },
    )

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

interface ProjectSearchParams {
  searchParams: {
    search: string
    page: string
    limit: string
    priority: string
    status: string
    sort: string
    sortBy: string
  }
}

export default async function Projects({ searchParams }: ProjectSearchParams) {
  const session = await getServerSession(authOptions)
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ''
  const priority = searchParams.priority || ''
  const status = searchParams.status || ''
  const sort = searchParams.sort || ''
  const sortBy = searchParams.sortBy || 'startDate'
  const { projects, totalProjects } = await getProjects(
    page,
    limit,
    session,
    search,
    priority,
    status,
    sort,
    sortBy,
  )
  /* console.log(projects[0].tasks) */
  const headers = [
    { title: 'Título', icon: <MdOutlineTitle /> },
    { title: 'Descrição', icon: <LuList /> },
    { title: 'Cliente', icon: <LuUser /> },
    { title: 'Data de início', icon: <LuCalendarDays /> },
    { title: 'Data de entrega', icon: <LuCalendarDays /> },
    { title: 'Progresso', icon: <RiProgress1Line /> },
    { title: 'Status', icon: <LuLoader2 /> },
    { title: 'Prioridade', icon: <MdPriorityHigh /> },
    { title: 'Ações', icon: <LuRedoDot />, className: 'w-[30px]' },
  ]

  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <ProjectCreationForm />
        <FilterProjects />
      </div>

      {/* Lista de projetos */}
      <div className="px-3 py-4">
        {projects.length === 0 ? (
          <div className="w-full h-screen flex items-start px-10 py-16 justify-center">
            <p>Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-800">
                {headers.map((header) => (
                  <TableHead
                    key={header.title}
                    className={header.className || 'whitespace-nowrap'}
                  >
                    <div className="flex items-center gap-2 justify-start">
                      <span className="text-sm font-bold bg-zinc-700 text-zinc-50 rounded-md p-1">
                        {header.icon}
                      </span>
                      <span className="font-medium text-zinc-50">
                        {header.title}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project: ProjectData) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    {project.client?.name || 'Cliente não especificado'}
                  </TableCell>
                  <TableCell>
                    {new Date(project.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(project.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ProgressBar value={50} />
                  </TableCell>
                  <TableCell>
                    <TableItem
                      className={`rounded-md text-zinc-100 ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </TableItem>
                  </TableCell>
                  <TableCell>
                    <TableItem
                      className={`rounded-md text-zinc-100 ${priorityColors[project.priority]}`}
                    >
                      {project.priority}
                    </TableItem>
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-1">
                    <TableActions project={project} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="bg-zinc-100 border-t px-3 py-2.5 ">
          <Pagination
            limit={limit}
            page={page}
            total={totalProjects}
            baseUrl="/projects"
            queryParams={{}}
          />
        </div>
      </div>
    </div>
  )
}
