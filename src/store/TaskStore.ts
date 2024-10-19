import { updateTasksAction } from '@/app/actions/tasks/updateTasks'
import { Deadlines, Task } from '@prisma/client'
import { isAfter } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { create } from 'zustand'

export type TaskStatus = 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

// Define o tipo completo de uma Task com todos os campos que deseja gerenciar
export interface TaskData {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  completedDate?: Date | null // Adicione a propriedade para data de conclusão
  status: TaskStatus
  deadlines: Deadlines
}

interface TaskStore {
  tasks: Record<string, Task>
  pendingChangesCount: number
  updateTask: (taskId: string, taskData: Partial<Task>) => void
  saveAllChanges: (projectId: string) => Promise<void>
  clearPendingChanges: () => void // Limpa o contador após salvar
}

// Cria o Zustand store
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: {},
  pendingChangesCount: 0,

  updateTask: (taskId, taskData) => {
    set((state) => {
      const updatedTask = {
        ...state.tasks[taskId],
        ...taskData, // Atualiza apenas os campos passados
      }

      // Verifica se o status foi alterado para CONCLUIDO
      if (taskData.status === 'CONCLUIDO') {
        updatedTask.completedDate = new Date() // Define a data de conclusão
      }

      if (updatedTask.endDate) {
        const endDate = new Date(updatedTask.endDate)
        const isWithinDeadline = isAfter(
          endDate,
          updatedTask.completedDate || new Date(),
        )

        updatedTask.deadlines = isWithinDeadline
          ? Deadlines.DENTRO_DO_PRAZO
          : Deadlines.FORA_DO_PRAZO
      }

      const updatedTasks = {
        ...state.tasks,
        [taskId]: updatedTask,
      }

      return {
        tasks: updatedTasks,
        pendingChangesCount: state.pendingChangesCount + 1,
      }
    })
  },

  saveAllChanges: async (projectId) => {
    const state = useTaskStore.getState()
    const tasksToUpdate = Object.values(state.tasks)

    try {
      // Envia as tasks atualizadas para o backend
      await updateTasksAction(tasksToUpdate)
      // Revalida o caminho e atualiza a interface
      revalidatePath(`/tasks?projectId=${projectId}`)
      // Atualiza o estado após o salvamento bem-sucedido

      set({ pendingChangesCount: 0 }) // limpa o contador após salvar
    } catch (error) {
      console.error('Failed to save task updates:', error)
    }
  },

  clearPendingChanges: () => set({ pendingChangesCount: 0 }),
}))
