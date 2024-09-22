import { updateTasksAction } from '@/app/actions/tasks/updateTasks'
import { Task } from '@prisma/client'
import { create } from 'zustand'

export type TaskStatus = 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

// Define o tipo completo de uma Task com todos os campos que deseja gerenciar
export interface TaskData {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: TaskStatus
}

interface TaskStore {
  tasks: Record<string, Task>
  updateTask: (taskId: string, taskData: Partial<Task>) => void
  saveAllChanges: (projectId: string) => Promise<void>
}

// Função para carregar o estado inicial do localStorage
const loadTasksFromLocalStorage = (): Record<string, Task> => {
  /* if (typeof window === 'undefined') return {} // Verifica se está no servidor */
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
      const updatedTasks = {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          ...taskData, // Atualiza apenas os campos passados
        },
      }
      saveTasksToLocalStorage(updatedTasks) // Atualiza o localStorage
      return { tasks: updatedTasks }
    })
  },
  saveAllChanges: async () => {
    const state = useTaskStore.getState()
    const tasksToUpdate = Object.values(state.tasks)

    try {
      // Envia as tasks atualizadas para o backend
      await updateTasksAction(tasksToUpdate)
      /* revalidatePath(`/tasks?projectId=${projectId}`) */

      // Limpa o localStorage e o estado local após salvar
      localStorage.removeItem('tasks')
      set({ tasks: {} })
    } catch (error) {
      console.error('Failed to save task updates:', error)
    }
  },
}))

/* // Carregar o estado do localStorage após a inicialização do Zustand
if (typeof window !== 'undefined') {
  const savedTasks = loadTasksFromLocalStorage()
  if (Object.keys(savedTasks).length > 0) {
    useTaskStore.setState({ tasks: savedTasks })
  }
}
 */
