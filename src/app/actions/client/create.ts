'use server'
import { prisma } from '@/lib/prisma'
import { FormDataClient, FormSchema } from '@/@types/schemas/FormSchemaClients'
import { revalidatePath } from 'next/cache'

export async function createClientAction(dataClient: FormDataClient) {
  try {
    // Convertendo FormData para um objeto com o formato correto
    console.log('Dados recebidos do formulário:', dataClient)

    // Validação do esquema (opcional, mas recomendável)
    const validatedData = FormSchema.parse(dataClient)
    console.log('validatedData:', validatedData)

    // Criar o projeto no banco de dados
    const client = await prisma.client.create({
      data: {
        userId: validatedData.userId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        postalCode: validatedData.postalCode,
        country: validatedData.country,
        type: validatedData.type,
        payment: validatedData.payment,
      },
    })

    revalidatePath('/clients')
    return client
  } catch (error) {
    console.error('Erro ao cadastrar o cliente:', error)
    throw new Error('Erro ao cadastrar o cliente')
  }
}
