'use client'
import { AddNewTasksModal } from './addTasks'
import { useState } from 'react'
import { Button } from '@/components/global/button'
import { FilterType } from './tasks'

interface FilterTasksProps {
  onFilterChange: (filter: FilterType) => void
}

export function FilterTasks({ onFilterChange }: FilterTasksProps) {
  const status: { label: string; value: FilterType }[] = [
    {
      label: 'Todas',
      value: 'all',
    },
    {
      label: 'A fazer',
      value: 'a fazer',
    },
    {
      label: 'Em andamento',
      value: 'em andamento',
    },
    {
      label: 'Concluído',
      value: 'concluído',
    },
  ]

  const [activeFilter, setActiveFilter] = useState('all')
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <AddNewTasksModal />
      <div className="rounded-xl w-full bg-zinc-50 h-[46px] flex justify-start px-4 py-2 items-center gap-11 ">
        {status.map((status) => (
          <Button
            variant="link"
            key={status.label}
            onClick={() => handleFilterClick(status.value)}
            className={`hover:text-violet-600 text-sm w-full  duration-300 px-2 py-3 rounded-lg text-zinc-600 ${
              activeFilter === status.value ? 'text-violet-600 bg-zinc-200' : ''
            }`}
          >
            {status.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
