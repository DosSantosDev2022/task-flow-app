'use server'
import { prisma } from '@/lib/prisma'
import {
  FormDataClient,
  FormSchema,
} from '@/@types/ZodSchemas/FormSchemaClients'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function createClientAction(dataClient: FormDataClient) {
  try {
    // Obter a sessão diretamente no server
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autenticado')
    }

    const userId = session.user.id

    // Validação do esquema
    const validatedData = FormSchema.parse(dataClient)

    // Criar o projeto no banco de dados
    const client = await prisma.client.create({
      data: {
        userId,
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
