import { z } from 'zod'

const paymentSchema = ['DINHEIRO', 'CREDITO', 'DEBITO', 'PIX'] as const
const statusSchema = ['TODOS', 'FINALIZADOS', 'PENDENTES'] as const
const prioritySchema = ['BAIXA', 'MEDIA', 'ALTA'] as const

export const FormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'O nome do projeto é obrigatório'),
  description: z.string().min(1, 'A descrição do projeto é obrigatória'),
  startDate: z.string(),
  endDate: z.string(),
  price: z.string().min(1, 'O preço é obrigatório'),
  payment: z.enum(paymentSchema),
  userId: z.string(),
  clientId: z.string(),
  status: z.enum(statusSchema),
  priority: z.enum(prioritySchema),
})

export type FormDataProject = z.infer<typeof FormSchema>
