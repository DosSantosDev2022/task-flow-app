import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableItem,
  Table,
} from '@/components/global/table'
import { FilterProjects } from '@/components/pages/projects/filters/'
import { ProjectCreationForm } from '@/components/pages/projects/createdProject/ProjectCreationForm'
import {
  LuCalendarDays,
  LuList,
  LuLoader2,
  LuRedoDot,
  LuUser,
} from 'react-icons/lu'
import { RiProgress1Line } from 'react-icons/ri'
import { MdOutlineTitle, MdPriorityHigh } from 'react-icons/md'
import { Pagination } from '@/components/global/pagination/pagination'
import { Project } from '@prisma/client'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { TableActions } from '@/components/pages/projects/tableActions/actions'
import { ProgressBar } from '@/components/global/progressBar'
const tableHead = [
  {
    title: 'Título',
    icon: <MdOutlineTitle />,
  },
  {
    title: 'Descrição',
    icon: <LuList />,
  },
  {
    title: 'Cliente',
    icon: <LuUser />,
  },
  {
    title: 'Data de início',
    icon: <LuCalendarDays />,
  },
  {
    title: 'Data de entrega',
    icon: <LuCalendarDays />,
  },
  {
    title: 'Progresso',
    icon: <RiProgress1Line />,
  },
  {
    title: 'Status',
    icon: <LuLoader2 />,
  },
  {
    title: 'Prioridade',
    icon: <MdPriorityHigh />,
  },
  {
    title: 'Ações',
    icon: <LuRedoDot />,
  },
]

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

interface getProjectsResponse {
  projects: Project[]
  totalProjects: number
}

async function getProjects(
  page: number,
  limit: number,
  session?: Session | null,
  search?: string,
): Promise<getProjectsResponse> {
  try {
    // Faz a requisição à rota da API que retorna os projetos
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''
    const res = await fetch(
      `${baseUrl}/api/projects?search=${search}&page=${page}&limit=${limit}`,
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

    // Obtém os dados da resposta
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
  }
}

export default async function Projects({ searchParams }: ProjectSearchParams) {
  const session = await getServerSession(authOptions)
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ''

  const { projects, totalProjects } = await getProjects(
    page,
    limit,
    session,
    search,
  )
  console.log('Session da pagina:', session)
  const baseUrl = '/projects'

  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <ProjectCreationForm /> {/* Form para registro de projetos */}
        <FilterProjects /> {/* Filtros */}
      </div>

      {/* Lista de projetos */}
      <div className="px-3 py-4">
        {projects.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <Table>
            <TableCaption></TableCaption>
            <TableHeader className="rounded-t-md">
              <TableRow className=" bg-zinc-800">
                {tableHead.map((item, index) => (
                  <TableHead key={index} className="whitespace-nowrap">
                    <div className="flex items-center gap-2 justify-start">
                      {item.icon && (
                        <span className="text-sm font-bold bg-zinc-700 text-zinc-50 rounded-md p-1">
                          {item.icon}
                        </span>
                      )}
                      <span className="font-medium text-zinc-50">
                        {item.title}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project: Project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.clientId}</TableCell>
                  <TableCell>
                    {new Date(project.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(project.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ProgressBar value={50}  />
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
                      className={`rounded-md  text-zinc-100 ${priorityColors[project.priority]}`}
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
            <TableFooter>
              <TableRow className="hover:opacity-100">
                <TableCell colSpan={8} className="font-bold ">
                  Total de Projetos:{' '}
                  <span className="font-normal">{totalProjects}</span>
                </TableCell>
                <Pagination
                  limit={limit}
                  page={page}
                  total={totalProjects}
                  baseUrl={baseUrl}
                  queryParams={{}}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  )
}
