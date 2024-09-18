// components/TaskCard.tsx
import { TaskStatus } from '@/store/TaskStatusStore'
import { Deadiline } from './deadline'
import { TbArrowBadgeRightFilled } from 'react-icons/tb'
import { Button } from '@/components/global/button'
import { twMerge } from 'tailwind-merge'
import { useDrag, DragSourceMonitor } from 'react-dnd'

interface TaskCardProps {
  id: string
  title: string
  status: TaskStatus
  description: string
  index: number
}

export function TaskCard({ title, status, description, id }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'A_FAZER':
        return 'text-red-600'
      case 'EM_ANDAMENTO':
        return 'text-yellow-400'
      case 'CONCLUIDO':
        return 'text-green-600'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className="border rounded-md p-4 flex flex-col items-start gap-2 justify-between w-full"
      style={{ background: isDragging ? 'bg-zinc-200' : '' }}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <TbArrowBadgeRightFilled
            className={getStatusColor(status)}
            size={24}
          />
          <h4 className="text-base font-normal text-zinc-600">{title}</h4>
        </div>
        <span
          className={twMerge(
            `w-[65px] h-[22px] px-1.5 py-[2px] rounded-2xl text-zinc-600 text-[10px] font-normal leading-7 flex items-center justify-center`,
          )}
        >
          {status}
        </span>
      </div>
      <Deadiline.Root className="justify-start">
        <Deadiline.Icon />
        <Deadiline.Date date="20/05/2024" />
      </Deadiline.Root>
      <div className="px-1 py-1.5 w-full">
        <p className="truncate">{description}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <Button variant="outline" sizes="full">
          Abrir tarefa
        </Button>
      </div>
    </div>
  )
}
