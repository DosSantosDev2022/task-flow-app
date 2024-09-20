import { TaskStatus } from '@prisma/client'

export const calculateProgress = (tasks: Record<string, TaskStatus>) => {
  const totalTasks = Object.keys(tasks).length
  const completedTasks = Object.values(tasks).filter(
    (status) => status === 'CONCLUIDO',
  ).length

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return parseFloat(progress.toFixed(2))
}
