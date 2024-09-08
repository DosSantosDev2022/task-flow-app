import { z } from "zod";

export const FormTaskSchema = z.object({
  taskName: z.string().min(1, 'O nome da tarefa é obrigatório'),
  projectName: z.string().min(1, 'Selecione um projeto'),
  startDate: z.string().min(1, 'Selecione uma data inicial'),
  endDate: z.string().min(1, 'Selecione uma data de entrega'),
  description: z.string().min(1, 'A descrição da tarefa é obrigatória'),
})

export type TaskFormData = z.infer<typeof FormTaskSchema>