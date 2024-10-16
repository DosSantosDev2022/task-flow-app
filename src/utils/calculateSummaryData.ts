import { Task } from '@prisma/client'

export const calculateSummaryData = (tasks: Task[]) => {
  const total = tasks.length

  const pending = tasks.filter((task) => task.status !== 'CONCLUIDO').length
  const completed = tasks.filter((task) => task.status === 'CONCLUIDO').length

  // filtra tarefas atrasadas que sejam pendentes
  const overdue = tasks.filter(
    (task) =>
      new Date() > new Date(task.endDate) && task.status !== 'CONCLUIDO',
  ).length
  // filtra tarefas pendentes dentro do prazo
  const withinTheDeadline = tasks.filter(
    (task) =>
      new Date(task.endDate) >= new Date() && task.status !== 'CONCLUIDO',
  ).length

  // filtra tarefas completadas dentro do prazo
  const completedWithinDeadline = tasks.filter(
    (task) =>
      task.status === 'CONCLUIDO' &&
      new Date(task.endDate) >= new Date(task.completedDate!),
  ).length

  // filtra tarefas completadas fora do prazo
  const completedOutOfTime = tasks.filter(
    (task) =>
      task.status === 'CONCLUIDO' &&
      new Date(task.endDate) < new Date(task.completedDate!),
  ).length

  return {
    total,
    pending,
    completed,
    overdue,
    completedWithinDeadline,
    completedOutOfTime,
    withinTheDeadline,
  }
}
