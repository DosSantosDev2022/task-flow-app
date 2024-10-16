import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { TasksCard } from '@/components/pages/dashboard/cards/tasks'
import { getTasks } from '@/utils/getTasks'
import { getServerSession } from 'next-auth/next'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  const { tasks } = await getTasks({ session })

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
