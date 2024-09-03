'use client'

import { useState } from 'react'
import { TaskActions } from './TaskActions'
import { TaskByStatus } from './TaskByStatus'
import { Task } from '@prisma/client'

export type FilterType = 'all' | 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

export function Tasks({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTasks = (status: string) => {
    return tasks.filter((task) => {
      if (filter === 'all') return task.status === status
      return task.status === status && task.status === filter
    })
  }

  return (
    <>
      <TaskActions onFilterChange={setFilter} />

      <div className="grid grid-cols-12 gap-2 px-2">
        <div className="col-span-4">
          <TaskByStatus status="A_FAZER" tasks={filteredTasks('A_FAZER')} />
        </div>
        <div className="col-span-4">
          <TaskByStatus
            status="EM_ANDAMENTO"
            tasks={filteredTasks('EM_ANDAMENTO')}
          />
        </div>
        <div className="col-span-4">
          <TaskByStatus status="CONCLUIDO" tasks={filteredTasks('CONCLUIDO')} />
        </div>
      </div>
    </>
  )
}
