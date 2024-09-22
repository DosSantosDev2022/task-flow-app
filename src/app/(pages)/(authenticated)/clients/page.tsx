import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/global/table'
import { FilterProjects } from '@/components/pages/clients/filters/FilterProject'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { ClientModal } from '@/components/pages/clients/createdClients/clientModal'
import { ClientData, getClients } from '@/utils/getClients'
import { Pagination } from '@/components/global/pagination/pagination'
import { BsCalendar2DateFill } from 'react-icons/bs'
import { MdAttachEmail, MdMyLocation, MdOutlineTitle } from 'react-icons/md'
import { FaCity, FaMap, FaPhone } from 'react-icons/fa'
import { FaLocationDot, FaMapLocation } from 'react-icons/fa6'

interface ClientsSearchParams {
  searchParams: {
    search: string
    page: string
    limit: string
    sort: string
    sortBy: string
    state: string
    city: string
  }
}

const headers = [
  { label: 'name', icon: <MdOutlineTitle /> },
  { label: 'email', icon: <MdAttachEmail /> },
  { label: 'phone', icon: <FaPhone /> },
  { label: 'address', icon: <FaLocationDot /> },
  { label: 'city', icon: <FaCity /> },
  { label: 'state', icon: <FaMapLocation /> },
  { label: 'postalCode', icon: <MdMyLocation /> },
  { label: 'country', icon: <FaMap /> },
  { label: 'createdAt', icon: <BsCalendar2DateFill />, className: 'w-[30px]' },
]

export default async function ClientsPage({
  searchParams,
}: ClientsSearchParams) {
  const session = await getServerSession(authOptions)
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ''
  const sort = searchParams.sort || ''
  const sortBy = searchParams.sortBy || 'createdAt'
  const state = searchParams.state || ''
  const city = searchParams.city || ''

  /* Função para busca de clients */
  const { clients, totalClients } = await getClients({
    search,
    session,
    page,
    limit,
    sort,
    sortBy,
    state,
    city,
  })

  return (
    <div>
      <div className="px-3 py-4 w-full border flex items-center justify-between">
        <div className="flex items-center w-full justify-between gap-2 px-2 py-3">
          <ClientModal />
          <FilterProjects />
        </div>
      </div>

      {/* List and projects */}

      <div className="px-3 py-4">
        {clients?.length === 0 ? (
          <div className="w-full h-screen flex items-start px-10 py-16 justify-center">
            <p>Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:opacity-100">
                {headers.map((header) => (
                  <TableHead
                    key={header.label}
                    className={header.className || 'whitespace-nowrap'}
                  >
                    <div className="flex items-center gap-2 justify-start">
                      <span className="text-sm font-bold bg-zinc-700 text-zinc-50 rounded-md p-1">
                        {header.icon}
                      </span>
                      <span className="font-medium text-zinc-50">
                        {header.label}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients?.map((client: ClientData) => (
                <TableRow className="overflow-auto" key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell className="max-w-[210px] ">
                    {client.email}
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="max-w-[210px] ">
                    {client.address}
                  </TableCell>
                  <TableCell>{client.city}</TableCell>
                  <TableCell>{client.state}</TableCell>
                  <TableCell>{client.postalCode}</TableCell>
                  <TableCell>{client.country}</TableCell>
                  <TableCell>
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                  {/*  <TableCell className="flex items-center justify-center gap-1">
                    <TableActions project={project} />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="bg-zinc-100 border-t px-3 py-2.5 ">
          <Pagination
            limit={limit}
            page={page}
            total={totalClients}
            baseUrl="/clients"
            queryParams={{}}
          />
        </div>
      </div>
    </div>
  )
}
