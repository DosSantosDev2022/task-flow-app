import { Project, Client } from '@prisma/client'
import { Session } from 'next-auth'

interface getClientParams {
  page?: number
  limit?: number
  session?: Session | null
  search?: string
  sort?: string
  sortBy?: string
}

export interface ClientData extends Client {
  Project: Project
}

interface ClientsResponse {
  clients: ClientData[]
  totalClients: number
}

export async function getClients({
  page = 1,
  limit = 10,
  session,
  search = '',
  sort = '',
  sortBy = 'createdAt',
}: getClientParams): Promise<ClientsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

    // Construa a URL de consulta dinamicamente
    const queryParams = new URLSearchParams({
      search: search ?? '',
      sort: sort ?? '',
      sortBy: sortBy ?? 'createdAt',
      page: page?.toString() ?? '1',
      limit: limit?.toString() ?? '10',
    }).toString()

    /* Fetch para buscar dos dados da api */
    const res = await fetch(`${baseUrl}/api/clients?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id ?? ''}`,
      },
    })
    console.log('Base URL:', process.env.NEXT_PUBLIC_API_URL)
    console.log('Search Params:', {
      search,
      session,
      page,
      limit,
      sort,
      sortBy,
    })

    if (!res.ok) {
      const errorDetails = await res.json()
      throw new Error(
        `Erro ao buscar projetos: ${res.status} ${res.statusText} - ${errorDetails.message}`,
      )
    }

    const { clients, totalClients } = await res.json()

    return { clients, totalClients }
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return { clients: [], totalClients: 0 }
  }
}
