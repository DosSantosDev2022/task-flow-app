import { saveTaskStatuses } from '@/app/actions/tasks/updade'
import { revalidatePath } from 'next/cache'
import { create } from 'zustand'

export type TaskStatus = 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

interface TaskStatusStore {
  taskStatuses: Record<string, TaskStatus>
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  saveAllChanges: () => Promise<void>
}

// Função para carregar o estado inicial do localStorage
const loadTaskStatusesFromLocalStorage = () => {
  const savedStatuses = localStorage.getItem('taskStatuses')
  return savedStatuses ? JSON.parse(savedStatuses) : {}
}

// Função para salvar o estado no localStorage
const saveTaskStatusesToLocalStorage = (taskStatuses: Record<string, TaskStatus>) => {
  localStorage.setItem('taskStatuses', JSON.stringify(taskStatuses))
}

// Cria o Zustand store
export const useTaskStatusStore = create<TaskStatusStore>((set) => ({
  taskStatuses: loadTaskStatusesFromLocalStorage(),
  updateTaskStatus: (taskId, status) => {
    set((state) => {
      const updatedStatuses = {
        ...state.taskStatuses,
        [taskId]: status,
      }
      saveTaskStatusesToLocalStorage(updatedStatuses) // Atualiza o localStorage
      return { taskStatuses: updatedStatuses }
    })
  },
  saveAllChanges: async () => {
    const state = useTaskStatusStore.getState()
    const tasksToUpdate = Object.entries(state.taskStatuses).map(
      ([taskId, status]) => ({
        id: taskId,
        status,
      }),
    )

    try {
      await saveTaskStatuses(tasksToUpdate)
      revalidatePath('/tasks')
      // Limpa o localStorage e o estado local após salvar
      localStorage.removeItem('taskStatuses')
      set({ taskStatuses: {} })
    } catch (error) {
      console.error('Failed to save task statuses:', error)
    }
  },
}))
