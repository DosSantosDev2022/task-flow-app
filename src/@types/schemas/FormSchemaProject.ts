import { z } from 'zod'

const paymentSchema = ['DINHEIRO', 'CREDITO', 'DEBITO', 'PIX'] as const

export const FormSchema = z.object({
  title: z.string().min(1, 'O nome do projeto é obrigatório'),
  description: z.string().min(1, 'A descrição do projeto é obrigatória'),
  startDate: z.string(),
  endDate: z.string(),
  price: z.string().min(1, 'O preço é obrigatório'),
  payment: z.enum(paymentSchema),
  userId: z.string(),
})

export type FormDataProject = z.infer<typeof FormSchema>
