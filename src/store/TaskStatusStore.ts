import { create } from 'zustand'

export type TaskStatus = 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

interface TaskStatusStore {
  taskStatuses: Record<string, TaskStatus>
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  saveAllChanges: () => Promise<void>
}

export const useTaskStatusStore = create<TaskStatusStore>((set) => ({
  taskStatuses: {},
  updateTaskStatus: (taskId, status) => {
    set((state) => ({
      taskStatuses: {
        ...state.taskStatuses,
        [taskId]: status,
      },
    }))
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
      await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({ tasksToUpdate }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // Clear local state after saving
      set({ taskStatuses: {} })
    } catch (error) {
      console.error('Failed to save task statuses:', error)
    }
  },
}))
