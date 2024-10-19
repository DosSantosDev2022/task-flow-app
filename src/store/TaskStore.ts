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
  updateTask: (taskId: string, taskData: Partial<Task>) => void
  saveAllChanges: (projectId: string) => Promise<void>
}

// Função para carregar o estado inicial do localStorage
const loadTasksFromLocalStorage = (): Record<string, Task> => {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : {}
}

// Função para salvar o estado no localStorage
const saveTasksToLocalStorage = (tasks: Record<string, Task>) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Cria o Zustand store
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: loadTasksFromLocalStorage(),
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

      saveTasksToLocalStorage(updatedTasks) // Atualiza o localStorage
      return { tasks: updatedTasks }
    })
  },
  saveAllChanges: async (projectId) => {
    const state = useTaskStore.getState()
    const tasksToUpdate = Object.values(state.tasks)

    try {
      // Envia as tasks atualizadas para o backend
      await updateTasksAction(tasksToUpdate)
      revalidatePath(`/tasks?projectId=${projectId}`)

      // Limpa o localStorage e o estado local após salvar
      localStorage.removeItem('tasks')
      set({ tasks: {} })
    } catch (error) {
      console.error('Failed to save task updates:', error)
    }
  },
}))

// Carregar o estado do localStorage após a inicialização do Zustand
if (typeof window !== 'undefined') {
  const savedTasks = loadTasksFromLocalStorage()
  if (Object.keys(savedTasks).length > 0) {
    useTaskStore.setState({ tasks: savedTasks })
  }
}
