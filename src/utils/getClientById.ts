import { ClientData } from '@/@types/client'
import { Session } from 'next-auth'

export async function getClientById(
  id: string,
  session: Session | null,
): Promise<ClientData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await fetch(`${baseUrl}/api/clients/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60,
      },
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar dados do cliente')
    }

    const { client } = await res.json()
    return client // Retorna o projeto com o cliente
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error)
    return null // Retorna null em caso de erro
  }
}
