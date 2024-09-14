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
  }
  // Definindo as opções do select
  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'A_FAZER', label: 'A fazer' },
    { value: 'EM_ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDO', label: 'Concluído' },
  ]

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
          {statusOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
