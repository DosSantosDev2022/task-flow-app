import { z } from 'zod'

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'O nome do projeto é obrigatório'),
  email: z.string().email('O email deve ser válido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  project: z.object({}).optional(),
  userId: z.string(),
})

export type FormDataClient = z.infer<typeof FormSchema>
