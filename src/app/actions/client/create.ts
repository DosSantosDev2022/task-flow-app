'use server'
import { prisma } from '@/lib/prisma'
import {
  FormDataClient,
  FormSchema,
} from '@/@types/ZodSchemas/FormSchemaClients'
import { revalidatePath } from 'next/cache'

export async function createClientAction(dataClient: FormDataClient) {
  try {
    // Validação do esquema
    const validatedData = FormSchema.parse(dataClient)

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
      },
    })

    revalidatePath('/clients')
    return client
  } catch (error) {
    console.error('Erro ao cadastrar o cliente:', error)
    throw new Error('Erro ao cadastrar o cliente')
  }
}
