import { Task } from '@prisma/client'
import { TaskCard } from './taskCard'
import { TaskStatus, useTaskStatusStore } from '@/store/TaskStatusStore'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import React from 'react'

const statusLabels: Record<TaskStatus, string> = {
  A_FAZER: 'A fazer',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
}

interface TypeTaskProps {
  status: TaskStatus
  tasks: Task[]
}

export function TaskByStatus({ status, tasks }: TypeTaskProps) {
  const getBorderTopColors = (type: TaskStatus): string => {
    switch (type) {
      case 'A_FAZER':
        return 'border-t-red-600'
      case 'EM_ANDAMENTO':
        return 'border-t-yellow-400'
      case 'CONCLUIDO':
        return 'border-t-green-600'
      default:
        return 'border-t-zinc-600'
    }
  }
  const { updateTaskStatus } = useTaskStatusStore()
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string }, monitor: DropTargetMonitor) => {
      if (monitor.canDrop()) {
        updateTaskStatus(item.id, status)
      }
    },
  })
  const borderTopClass = getBorderTopColors(status)
  const statusLabel = statusLabels[status] || 'Desconhecido'
  return (
    <div
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      className="col-span-4 border p-2 rounded-md  overflow-y-auto max-h-[468px] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-600 "
    >
      <div className={`border-t-2 p-4 ${borderTopClass} `}>
        <div className="flex items-center justify-between gap-1 rounded-lg">
          <span className="text-sm font-normal text-zinc-600">
            {statusLabel}
          </span>
          <div className="w-6 h-6 text-xs rounded-full flex items-center justify-center text-zinc-800 bg-zinc-300">
            {tasks.length}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <div key={index}>
            <TaskCard
              id={task.id}
              status={status}
              title={task.title}
              description={task.description || ''}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
