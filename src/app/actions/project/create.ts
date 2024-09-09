'use server'
import { prisma } from '@/lib/prisma'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { revalidatePath } from 'next/cache'

export async function createProjectAction(dataProject: FormDataProject) {
  try {
    // Convertendo FormData para um objeto com o formato correto
    console.log('Dados recebidos do formulário:', dataProject)

    // Validação do esquema (opcional, mas recomendável)
    const validatedData = FormSchema.parse(dataProject)
    console.log('validatedData:', validatedData)

    // Gera um slug com base no titulo do projeto
    const slug = dataProject.title.toLowerCase().replace(/\s+/g, '-')
    // Criar o projeto no banco de dados
    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
        // Convertendo strings para os tipos corretos antes de salvar no banco de dados
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        price: parseFloat(validatedData.price),
      },
    })
    console.log(project)
    revalidatePath('/projects')
    return project
  } catch (error) {
    console.error('Erro ao criar o projeto:', error)
    throw new Error('Erro ao criar o projeto')
  }
}
