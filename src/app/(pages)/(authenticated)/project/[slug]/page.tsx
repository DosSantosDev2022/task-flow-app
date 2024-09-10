import { Project } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ProjectDetailsParams {
  params: {
    slug: string
  }
}
const fetchProjectData = async (slug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    const response = await fetch(`${baseUrl}/api/projects/${slug}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao buscar projeto')
    }

    const data: Project = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error, 'Erro ao buscar o projeto')
    return null
  }
}

export default async function ProjectDetails({ params }: ProjectDetailsParams) {
  const project = await fetchProjectData(params.slug)

  if (!project) {
    return (
      <div className="px-4 py-5">
        <p>Projeto não encontrado</p>
      </div>
    )
  }

  // Formatação das data
  const startDateFormatted = project.startDate
    ? format(new Date(project.startDate), 'dd/MM/yyyy', { locale: ptBR })
    : 'Data não informada'

  const endDateFormatted = project.endDate
    ? format(new Date(project.endDate), 'dd/MM/yyyy', { locale: ptBR })
    : 'Data não informada'

  // Formatação do preço como moeda

  const priceFormatted = project.price
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(project.price))
    : 'Preço não informado'

  return (
    <>
      <div className="px-4 py-5">
        <div className="border rounded-md p-4">
          <h1>{project.title}</h1>
          <p>{project.description || 'Sem descrição'}</p>
          <p>Data de início: {startDateFormatted}</p>
          <p>Data de entrega:{endDateFormatted}</p>
          <p>Preço cobrado: {priceFormatted}</p>
          <p>Forma de pagamento: {project.payment}</p>
        </div>
      </div>
    </>
  )
}
