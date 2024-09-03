import { TaskStatus, useTaskStatusStore } from '@/store/TaskStatusStore'
import { Deadiline } from './deadline'

interface TaskCardProps {
  id: string
  title: string
  status: TaskStatus
}

export function TaskCard({ title, id, status }: TaskCardProps) {
  const updateTaskStatus = useTaskStatusStore((state) => state.updateTaskStatus)

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TaskStatus
    updateTaskStatus(id, newStatus)
    console.log(newStatus)
  }

  return (
    <div className="border rounded-md p-4 flex items-center gap-2 justify-between w-full">
      <div className="w-full space-y-2">
        <div className="flex w-full justify-between">
          <h4 className="text-base font-medium text-zinc-600">{title}</h4>
        </div>

        <Deadiline.Root className="justify-start">
          <Deadiline.Icon />
          <Deadiline.Date date="20/05/2024" />
        </Deadiline.Root>

        <select
          value={status}
          onChange={handleChangeStatus}
          className="mt-2 p-1 border rounded-md text-sm"
        >
          <option value="A_FAZER">A fazer</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDO">Concluído</option>
        </select>
      </div>
    </div>
  )
}
