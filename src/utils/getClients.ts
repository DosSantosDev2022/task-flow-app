import { ClientsResponse, getClientParams } from '@/@types/client'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getClients({
  page = 1,
  limit = 10,
  search = '',
  sort = '',
  sortBy = 'createdAt',
  state,
  city,
}: getClientParams): Promise<ClientsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    const session = await getServerSession(authOptions)
    // Construa a URL de consulta dinamicamente
    const queryParams = new URLSearchParams({
      search: search ?? '',
      state: state ?? '',
      city: city ?? '',
      sort: sort ?? '',
      sortBy: sortBy ?? '',
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
      next: {
        revalidate: 60 * 60,
      },
    })

    if (!res.ok) {
      const errorDetails = await res.json()
      throw new Error(
        `Erro ao buscar clientes: ${res.status} ${res.statusText} - ${errorDetails.message}`,
      )
    }

    const { clients, totalClients } = await res.json()

    return { clients, totalClients }
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return { clients: [], totalClients: 0 }
  }
}
