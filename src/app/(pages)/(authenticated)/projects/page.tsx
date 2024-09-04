import { prisma } from '@/lib/prisma'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/global/table'
import { Input } from '@/components/global/input'
import { Button } from '@/components/global/button'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { CiSearch } from 'react-icons/ci'
import { BiExport } from 'react-icons/bi'
import { FilterProjects } from '@/components/pages/projects/filterProjects'

async function getProjects() {
  try {
    const projects = await prisma.project.findMany()
    return projects
  } catch (error) {
    console.error('Erro ao buscar projetos, verifique !', error)
    return []
  }
}

export default async function Projects() {
  const projects = await getProjects()

  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <div className="flex items-center gap-2 px-2 py-3">
          <Button sizes="xs" variant="highlight">
            Novo Projeto
          </Button>
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
            <TableCaption>Lista de Projetos</TableCaption>
            <TableHeader>
              <TableRow className="hover:opacity-100">
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Visualizar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    {new Date(project.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(project.endDate).toLocaleDateString()}
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
                <TableCell colSpan={5}>
                  Total de Projetos: {projects.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  )
}
