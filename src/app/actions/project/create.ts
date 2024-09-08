import { prisma } from '@/lib/prisma';
import { FormSchema } from '@/@types/schemas/FormSchemaProject';
import { revalidatePath } from 'next/cache';
import { Payment } from '@prisma/client';

export async function createProjectAction(dataProject: FormData) {
  try {
    // Convertendo FormData para um objeto com o formato correto
    console.log('Dados recebidos do formulário:', dataProject)
    const projectData = {
      title: dataProject.get('title') as string,
      description: dataProject.get('description') as string,
      startDate: dataProject.get('startDate') as string, // mantendo como string
      endDate: dataProject.get('endDate') as string,     // mantendo como string
      price: dataProject.get('price') as string,         // mantendo como string
      payment: dataProject.get('payment') as Payment,   // Altere conforme necessário
      userId: dataProject.get('userId') as string,  
    };

    // Validação do esquema (opcional, mas recomendável)
    const validatedData = FormSchema.parse(projectData);
    console.log('validatedData:',validatedData)
    // Criar o projeto no banco de dados
    const project = await prisma.project.create({
      data: {
        ...validatedData,
        // Convertendo strings para os tipos corretos antes de salvar no banco de dados
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        price: parseFloat(validatedData.price),
      },
    });
     console.log(project)
    revalidatePath('/projects');
    return project
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    throw new Error('Erro ao criar o projeto');
  }
}
