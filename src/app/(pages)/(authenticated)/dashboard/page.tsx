import { TasksCard } from '@/components/pages/dashboard/cards/tasks'
import { getTasks } from '@/utils/getTasks'

export default async function Dashboard() {
  const { tasks } = await getTasks()

  console.log(tasks)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-2 bg-zinc-200">
      <div className="flex items-center justify-between w-full  shadow-sm px-1 py-1.5 gap-4">
        <TasksCard tasks={tasks} /> {/* Card resumo de tarefas */}
        <TasksCard tasks={tasks} />
        <TasksCard tasks={tasks} />
        <TasksCard tasks={tasks} />
      </div>
    </div>
  )
}
