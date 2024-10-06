import { FormDataProject } from '@/@types/FormSchemas/FormSchemaProject'
import { getProjectById } from '@/utils/getProjectById'
import { format } from 'date-fns'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

export const UseFetchProjects = (
  projectId: string,
  session: Session | null,
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [initialData, setInitialData] = useState<FormDataProject>({
    id: '',
    title: '',
    description: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    price: '0',
    payment: 'DINHEIRO',
    clientId: '',
    priority: 'MEDIA',
    status: 'TODOS',
    userId: '',
    client: { id: '', name: '' },
  })

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true)
        const project = await getProjectById(projectId, session)
        if (project) {
          const formattedData: FormDataProject = {
            id: project.id,
            title: project.title || '',
            description: project.description || '',
            startDate: project.startDate
              ? format(new Date(project.startDate), 'yyyy/MM/dd')
              : '',
            endDate: project.endDate
              ? format(new Date(project.endDate), 'yyyy/MM/dd')
              : '',
            price: project.price?.toString() || '',
            payment: project.payment || 'DINHEIRO',
            status: project.status || 'PENDENTES',
            userId: project.userId || '',
            client: {
              id: project.client.id || '',
              name: project.client.name || '',
            },
            clientId: project.clientId || '',
            priority: project.priority || 'BAIXA',
          }
          setInitialData(formattedData)
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do projeto:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId, session])

  return { initialData, isLoading }
}
