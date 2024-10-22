import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/global/table'
import { FilterProjects } from '@/components/pages/projects/filters'
import { ProjectCreationModal } from '@/components/pages/projects/createdProject/ProjectModal'
import { Pagination } from '@/components/global/pagination/pagination'
import { Actions } from '@/components/pages/projects/tableActions/actions'
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
import { getProjects } from '@/utils/getProjects'
import { Badge } from '@/components/global/badge'
import { stripHtmlTags } from '@/utils/stripHtml.ts'
import { format } from 'date-fns'
import { ProjectData } from '@/@types/project'

const headers = [
  { title: 'Título', icon: <MdOutlineTitle size={12} /> },
  { title: 'Descrição', icon: <LuList size={12} /> },
  { title: 'Cliente', icon: <LuUser size={12} /> },
  { title: 'Data de início', icon: <LuCalendarDays size={12} /> },
  { title: 'Data de entrega', icon: <LuCalendarDays size={12} /> },
  { title: 'Progresso', icon: <RiProgress1Line size={12} /> },
  { title: 'Status', icon: <LuLoader2 size={12} />, className: 'w-[30px] ' },
  {
    title: 'Prioridade',
    icon: <MdPriorityHigh size={12} />,
    className: 'w-[30px] ',
  },
  {
    title: '',
    icon: <LuRedoDot />,
    className: 'w-full flex items-center justify-center',
  },
]

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
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ''
  const priority = searchParams.priority || ''
  const status = searchParams.status || ''
  const sort = searchParams.sort || ''
  const sortBy = searchParams.sortBy || 'startDate'
  /* Função para busca de projetos */
  const { projects, totalProjects } = await getProjects({
    page,
    limit,
    search,
    priority,
    status,
    sort,
    sortBy,
  })

  return (
    <>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <ProjectCreationModal />
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
              <TableRow className="hover:opacity-100">
                {headers.map((header) => (
                  <TableHead
                    key={header.title}
                    className={header.className || ''}
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className="text-sm font-bold bg-secondary text-neutral rounded-md p-1">
                        {header.icon}
                      </span>
                      <span className="font-medium text-[12.5px] text-light">
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
                  <TableCell className="max-w-[210px] ">
                    {project.title}
                  </TableCell>
                  <TableCell className="max-w-[210px] ">
                    {stripHtmlTags(project.description || '', 100)}
                  </TableCell>
                  <TableCell>
                    {project.client?.name || 'Cliente não especificado'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.startDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.endDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <ProgressBar value={project.progress} />
                  </TableCell>
                  <TableCell className="w-[30px] ">
                    <Badge status={project.status}>{project.status}</Badge>
                  </TableCell>
                  <TableCell className="w-[30px]">
                    <Badge status={project.priority}>{project.priority}</Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Actions project={project} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="bg-light border-t border-b rounded-lg px-3 py-2.5 ">
          <Pagination
            limit={limit}
            page={page}
            total={totalProjects}
            baseUrl="/projects"
            queryParams={{}}
          />
        </div>
      </div>
    </>
  )
}
