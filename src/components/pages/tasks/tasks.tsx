'use client'
import { useState, useCallback, useEffect } from 'react'
import { TaskByStatus } from './TaskByStatus'
import { Task, TaskStatus } from '@prisma/client'
import { TaskAddForm } from './TaskAddForm'
import { Button } from '@/components/global/button'
import { useTaskStatusStore } from '@/store/TaskStatusStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useNotification } from '@/contexts/NotificationContext'
import { LoadingOverlay } from '../../global/loading/LoadingOverlaySaveTasks'
import { MdSaveAlt } from 'react-icons/md'

interface TasksProps {
  tasks: Task[]
  projectId: string
}

export type FilterType = 'all' | 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'
const statusOptions: { label: string; value: FilterType }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'A fazer', value: 'A_FAZER' },
  { label: 'Em andamento', value: 'EM_ANDAMENTO' },
  { label: 'Concluído', value: 'CONCLUIDO' },
]

export function Tasks({ tasks, projectId }: TasksProps) {
  const [filterTasks, setFilterTasks] = useState<FilterType>('all')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()
  const { taskStatuses, updateTaskStatus, saveAllChanges } =
    useTaskStatusStore()

  useEffect(() => {
    tasks.forEach((task) => {
      if (!taskStatuses[task.id]) {
        updateTaskStatus(task.id, task.status)
      }
    })
  }, [tasks, taskStatuses, updateTaskStatus])

  const filteredTasks = (filter: FilterType) => {
    if (filter === 'all') {
      return {
        A_FAZER: tasks.filter((task) => taskStatuses[task.id] === 'A_FAZER'),
        EM_ANDAMENTO: tasks.filter(
          (task) => taskStatuses[task.id] === 'EM_ANDAMENTO',
        ),
        CONCLUIDO: tasks.filter(
          (task) => taskStatuses[task.id] === 'CONCLUIDO',
        ),
      }
    }
    return {
      [filter]: tasks.filter((task) => taskStatuses[task.id] === filter),
    }
  }
  const taskGroups = filteredTasks(filterTasks)

  const handleFilterClick = (status: FilterType) => {
    setActiveFilter(status)
    setFilterTasks(status)
  }

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true)
      await saveAllChanges(projectId)
      showNotification('Informações atualizadas', 'success')
    } catch (error) {
      console.error('Error saving changes:', error)
      showNotification('Erro ao salvar alterações', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = useCallback(
    (newTask: Task) => {
      updateTaskStatus(newTask.id, newTask.status)
    },
    [updateTaskStatus],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Loading overlay */}
      {isLoading && <LoadingOverlay label="Salvando..." />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 px-2 py-4">
        <TaskAddForm projectId={projectId} onAddTask={handleAddTask} />
        <div className="rounded-xl w-full overflow-x-auto bg-zinc-50 shadow-sm flex justify-start lg:px-4 py-2 px-2 items-center gap-2 lg:gap-4">
          {statusOptions.map((status) => (
            <Button
              variant="outline"
              sizes="full"
              key={status.value}
              onClick={() => handleFilterClick(status.value)}
              className={`hover:text-violet-600 lg:px-2  lg:py-3 px-1.5 py-2 text-xs whitespace-nowrap border-none${
                activeFilter === status.value
                  ? ' text-violet-600 bg-zinc-200'
                  : ''
              }`}
            >
              {status.label}
            </Button>
          ))}

          <Button
            className="hidden lg:flex"
            effects="scale"
            variant="primary"
            isLoading={isLoading}
            onClick={handleSaveChanges}
          >
            {isLoading ? (
              'Salvando...'
            ) : (
              <span className="flex items-center justify-center gap-1 w-[98px] h-10 rounded-2xl px-2 py-4">
                <MdSaveAlt size={16} />
                Salvar
              </span>
            )}
          </Button>
          {/* Botão flutuante mobile */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button
              className="w-[50px] h-[50px] rounded-full bg-violet-600 text-white shadow-lg flex items-center justify-center"
              effects="scale"
              variant="primary"
              isLoading={isLoading}
              onClick={handleSaveChanges}
            >
              {isLoading ? '...' : <MdSaveAlt size={28} />}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 px-2">
        {['A_FAZER', 'EM_ANDAMENTO', 'CONCLUIDO'].map((status, index) => (
          <div
            key={index}
            className={`col-span-1 ${
              activeFilter === 'all'
                ? 'md:col-span-4'
                : activeFilter === status
                  ? 'md:col-span-12'
                  : 'hidden'
            }`}
          >
            <TaskByStatus
              status={status as TaskStatus}
              tasks={taskGroups[status as TaskStatus] || []}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  )
}
