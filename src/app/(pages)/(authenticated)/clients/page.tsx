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
import { CiSearch } from 'react-icons/ci'
import { BiExport } from 'react-icons/bi'
import { FilterProjects } from '@/components/pages/projects/filterProjects'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { CreatedClients } from '@/components/pages/clients/createdClients/createdClients'

async function getClients() {
  const session = await getServerSession(authOptions)
  try {
    const clients = await prisma.client.findMany({
      where: {
        userId: session?.user.id,
      },
    })
    return clients
  } catch (error) {
    console.error('Erro ao buscar clientes, verifique !', error)
    return []
  }
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <div className="flex items-center gap-2 px-2 py-3">
          <CreatedClients />
        </div>

        <div className="flex items-center gap-2">
          <Input.Root>
            <Input.Icon>
              <CiSearch size={24} className="text-zinc-400" />
            </Input.Icon>
            <Input.Input placeholder="Buscar cliente..." />
          </Input.Root>

          <FilterProjects />

          <Button sizes="icon" variant="outline" className="w-12">
            <BiExport />
          </Button>
        </div>
      </div>

      {/* List and projects */}

      <div className="px-3 py-4">
        {clients.length === 0 ? (
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
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.city}</TableCell>
                  <TableCell>{client.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="hover:opacity-100">
                <TableCell colSpan={5}>
                  Total de Projetos: {clients.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  )
}
