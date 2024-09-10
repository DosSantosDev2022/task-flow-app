'use client'
import { useState, useCallback, useEffect } from 'react'
import { TaskByStatus } from './TaskByStatus'
import { Task } from '@prisma/client'
import { TaskAddForm } from './TaskAddForm'
import { Button } from '@/components/global/button'
import { useTaskStatusStore } from '@/store/TaskStatusStore'

interface TasksProps {
  tasks: Task[]
  projectId: string
}

export type FilterType = 'all' | 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'

export function Tasks({ tasks, projectId }: TasksProps) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [isLoading, setIsLoading] = useState(false)
  const { taskStatuses, updateTaskStatus, saveAllChanges } = useTaskStatusStore()

  useEffect(() => {
    // Initialize the task statuses from tasks prop
    tasks.forEach(task => {
      if (!taskStatuses[task.id]) {
        updateTaskStatus(task.id, task.status)
      }
    })
  }, [tasks, taskStatuses, updateTaskStatus])

 // Filtra tarefas de acordo com o status atual
 const filteredTasks = (status: FilterType) => {
  if (status === 'all') {
    return tasks
  }
  return tasks.filter(task => taskStatuses[task.id] === status)
}

  const statusOptions: { label: string; value: FilterType }[] = [
    {
      label: 'Todas',
      value: 'all',
    },
    {
      label: 'A fazer',
      value: 'A_FAZER',
    },
    {
      label: 'Em andamento',
      value: 'EM_ANDAMENTO',
    },
    {
      label: 'Concluído',
      value: 'CONCLUIDO',
    },
  ]

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter)
    setFilter(filter)
  }

  const handleSaveChanges = async () => {
    setIsLoading(true)
    try {
      await saveAllChanges()
    } catch (error) {
      console.error('Error saving changes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para adicionar uma nova tarefa à lista
  const handleAddTask = useCallback((newTask: Task) => {
    updateTaskStatus(newTask.id, newTask.status)
  }, [updateTaskStatus])

  return (
    <>
      <div className="flex items-center gap-2 px-2 py-4">
        <TaskAddForm projectId={projectId} onAddTask={handleAddTask} />
        <div className="rounded-xl w-full bg-zinc-50 h-[46px] flex justify-start px-4 py-2 items-center gap-11">
          {statusOptions.map((status) => (
            <Button
              variant="link"
              key={status.value}
              onClick={() => handleFilterClick(status.value)}
              className={`hover:text-violet-600 text-sm w-full duration-300 px-2 py-3 rounded-lg text-zinc-600 ${
                activeFilter === status.value
                  ? 'text-violet-600 bg-zinc-200'
                  : ''
              }`}
            >
              {status.label}
            </Button>
          ))}

          <Button
            variant="highlight"
            isLoading={isLoading}
            onClick={handleSaveChanges}
            className="ml-4"
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

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
