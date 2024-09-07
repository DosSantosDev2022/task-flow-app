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
import { Input } from '@/components/global/input'
import { Button } from '@/components/global/button'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { CiSearch } from 'react-icons/ci'
import { BiExport } from 'react-icons/bi'
import { FilterProjects } from '@/components/pages/projects/filterProjects'
import { CreatedProject } from '@/components/pages/projects/createdProject/createdProject'
import { LuCalendarDays, LuList, LuLoader2, LuUser } from 'react-icons/lu'
import { RiProgress1Line } from 'react-icons/ri'
import { MdOutlineTitle } from 'react-icons/md'
import { Project } from '@prisma/client'
import { Pagination } from '@/components/global/pagination/pagination'

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
    title: 'Visualizar',
    icon: <LuCalendarDays />,
  },
]
async function getProjects(page: number, limit: number) {
  try {
    // Faz a requisição à rota da API que retorna os projetos
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''
    const res = await fetch(
      `${baseUrl}/api/project?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) {
      throw new Error('Erro ao buscar projetos')
    }

    // Obtém os dados da resposta
    const data: Project[] = await res.json()
    console.log('Resposta da API:', data)

    return data
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return []
  }
}

interface ProjectSearchParams {
  searchParams: {
    page: string
    limit: string
  }
}

export default async function Projects({ searchParams }: ProjectSearchParams) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10

  const projects = await getProjects(page, limit)
  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <div className="flex items-center gap-2 px-2 py-3">
          <CreatedProject />
        </div>

        <div className="flex items-center gap-2">
          <Input.Root>
            <Input.Icon>
              <CiSearch size={24} className="text-zinc-400" />
            </Input.Icon>
            <Input.Input placeholder="Buscar projetos..." />
          </Input.Root>

          <FilterProjects />

          <Button sizes="icon" variant="outline" className="w-12">
            <BiExport />
          </Button>
        </div>
      </div>

      {/* List and projects */}

      <div className="px-3 py-4">
        {projects.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <Table>
            <TableCaption>
              <Pagination limit={limit} page={page} total={limit} />
            </TableCaption>
            <TableHeader className="rounded-t-md">
              <TableRow className="hover:opacity-100 bg-zinc-800 ">
                {tableHead.map((item, index) => (
                  <TableHead key={index}>
                    <div className="flex items-center gap-2 justify-start">
                      {item.icon && (
                        <span className="text-lg font-bold bg-zinc-700 text-zinc-50 rounded-md p-1">
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
              {projects.map((project) => (
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
                  <TableCell></TableCell>
                  <TableCell>
                    <TableItem className="rounded-md bg-green-500 text-zinc-100">
                      status
                    </TableItem>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" sizes="icon">
                      <RxOpenInNewWindow size={24} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="hover:opacity-100">
                <TableCell colSpan={5}>Total de Projetos: {limit}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  )
}
