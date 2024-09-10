import { TaskStatus } from '@prisma/client'
import { z } from 'zod'

export const FormTaskSchema = z.object({
  title: z.string().min(1, 'O nome da tarefa é obrigatório'),
  startDate: z.string().min(1, 'Selecione uma data inicial'),
  endDate: z.string().min(1, 'Selecione uma data de entrega'),
  description: z.string().min(1, 'A descrição da tarefa é obrigatória'),
  userId: z.string(),
  projectId: z.string(),
})

export type TaskFormData = z.infer<typeof FormTaskSchema>
