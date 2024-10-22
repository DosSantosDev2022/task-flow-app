import { z } from 'zod'

const paymentSchema = ['DINHEIRO', 'CREDITO', 'DEBITO', 'PIX'] as const
const statusSchema = ['TODOS', 'FINALIZADOS', 'PENDENTES'] as const
const prioritySchema = ['BAIXA', 'MEDIA', 'ALTA'] as const

const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('O email deve ser válido').optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const FormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'O nome do projeto é obrigatório'),
  description: z.string().min(1, 'A descrição do projeto é obrigatória'),
  startDate: z.string(),
  endDate: z.string(),
  price: z.string().min(1, 'O preço é obrigatório'),
  payment: z.enum(paymentSchema),
  client: ClientSchema.optional(),
  clientId: z.string(),
  status: z.enum(statusSchema).optional(),
  priority: z.enum(prioritySchema),
})

export type FormDataProject = z.infer<typeof FormSchema>
