import { z } from 'zod'

const status = ['A_FAZER', 'EM_ANDAMENTO', 'CONCLUIDO'] as const

export const FormTaskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'O nome da tarefa é obrigatório'),
  startDate: z.string().min(1, 'Selecione uma data inicial'),
  endDate: z.string().min(1, 'Selecione uma data de entrega'),
  /* completedDate: z.string().optional(), */
  description: z.string().min(1, 'A descrição da tarefa é obrigatória'),
  userId: z.string(),
  projectId: z.string(),
  status: z.enum(status).optional(),
})

export type TaskFormData = z.infer<typeof FormTaskSchema>
