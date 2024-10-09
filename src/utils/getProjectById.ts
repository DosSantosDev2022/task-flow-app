import { FormDataProject } from '@/@types/ZodSchemas/FormSchemaProject'
import { Session } from 'next-auth'

export async function getProjectById(
  id: string,
  session: Session | null,
): Promise<FormDataProject | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.id ?? ''}`,
      },
      cache: 'force-cache',
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar projeto')
    }

    const { project } = await res.json()
    return project // Retorna o projeto com o cliente
  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    return null // Retorna null em caso de erro
  }
}
