import { TasksCard } from '@/components/pages/dashboard/cards/tasks'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-2 bg-zinc-200">
      <div className="flex items-center justify-between w-full  shadow-sm px-1 py-1.5 gap-4">
        <TasksCard /> {/* Card resumo de tarefas */}
        <TasksCard />
        <TasksCard />
        <TasksCard />
      </div>
    </div>
  )
}
