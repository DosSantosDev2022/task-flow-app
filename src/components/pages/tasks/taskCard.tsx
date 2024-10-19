import { Deadiline } from './deadline'
import { TbArrowBadgeRightFilled } from 'react-icons/tb'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { Badge } from '@/components/global/badge'
import { ModalTasksForm } from './modal/EditTasksForm'
import { Task, TaskStatus } from '@prisma/client'
import { isAfter } from 'date-fns'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'A_FAZER':
        return 'text-red-500'
      case 'EM_ANDAMENTO':
        return 'text-yellow-500'
      case 'CONCLUIDO':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const isWithinDeadlineTask = () => {
    if (!task.endDate) return false

    const endDate = new Date(task.endDate)

    if (!task.completedDate) {
      return isAfter(endDate, new Date())
    }

    const completedTasks = new Date(task.completedDate)
    return isAfter(endDate, completedTasks)
  }

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className="border rounded-md p-4 flex flex-col items-start gap-2 justify-between w-full"
      style={{ background: isDragging ? 'bg-neutral' : '' }}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <TbArrowBadgeRightFilled
            className={getStatusColor(task.status)}
            size={24}
          />
          <h4 className="text-base font-normal text-primary">{task.title}</h4>
        </div>
        <Badge status={task.status} className="px-1.5 py-1 w-[96px] " />
      </div>
      <Deadiline.Root className="justify-start">
        <Deadiline.Icon
          className={isWithinDeadlineTask() ? 'bg-green-500' : 'bg-red-500'}
          prazo={isWithinDeadlineTask() ? 'No prazo' : 'Fora do prazo'}
        />
        <Deadiline.Date date={new Date(task.endDate).toLocaleDateString()} />
      </Deadiline.Root>
      <div className="px-1 py-1.5 w-full">
        <p className="truncate text-xs text-secondary/50">{task.description}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <ModalTasksForm task={task} />
      </div>
    </div>
  )
}
