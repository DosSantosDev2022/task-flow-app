'use client'

import { useState, useCallback, useEffect } from 'react'
import { TaskByStatus } from './TaskByStatus'
import { Task, TaskStatus } from '@prisma/client'
import { Button } from '@/components/global/button'
import { useTaskStore } from '@/store/TaskStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useNotification } from '@/contexts/NotificationContext'
import { LoadingOverlay } from '../../global/loading/LoadingOverlaySaveTasks'
import { MdSaveAlt } from 'react-icons/md'
import { TaskAddForm } from './modal/TaskAddForm'

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

export function Tasks({ tasks: initialTasks, projectId }: TasksProps) {
  const [filterTasks, setFilterTasks] = useState<FilterType>('all')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()
  const { tasks, updateTask, saveAllChanges } = useTaskStore() // Mudança para tasks e updateTask do Zustand

  // Sincroniza as tasks com o Zustand, caso elas não estejam no store
  useEffect(() => {
    initialTasks.forEach((task) => {
      if (!tasks[task.id]) {
        updateTask(task.id, task) // Atualiza o Zustand com a task completa
      }
    })
  }, [initialTasks, tasks, updateTask])

  // Função de filtragem atualizada para tasks completas
  const filteredTasks = (filter: FilterType, projectId: string) => {
    const projectTasks = Object.values(tasks).filter(
      (task) => task.projectId === projectId,
    )
    if (filter === 'all') {
      return {
        A_FAZER: projectTasks.filter((task) => task.status === 'A_FAZER'),
        EM_ANDAMENTO: projectTasks.filter(
          (task) => task.status === 'EM_ANDAMENTO',
        ),
        CONCLUIDO: projectTasks.filter((task) => task.status === 'CONCLUIDO'),
      }
    }
    return {
      [filter]: projectTasks.filter((task) => task.status === filter),
    }
  }

  const taskGroups = filteredTasks(filterTasks, projectId)

  const handleFilterClick = (status: FilterType) => {
    setActiveFilter(status)
    setFilterTasks(status)
  }

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true)
      await saveAllChanges(projectId) // Salva todas as alterações via Zustand
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
      updateTask(newTask.id, newTask) // Adiciona a nova task ao Zustand
    },
    [updateTask],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Loading overlay */}
      {isLoading && <LoadingOverlay label="Salvando..." />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 px-2 py-4">
        <TaskAddForm projectId={projectId} onAddTask={handleAddTask} />
        <div className="rounded-xl w-full overflow-x-auto bg-light shadow-sm flex justify-start lg:px-4 py-2 px-2 items-center gap-2 lg:gap-4">
          {statusOptions.map((status) => (
            <Button
              variant="outline"
              sizes="full"
              key={status.value}
              onClick={() => handleFilterClick(status.value)}
              className={`hover:text-accent lg:px-2  lg:py-3 px-1.5 py-2 text-xs font-semibold whitespace-nowrap border-none${
                activeFilter === status.value ? ' text-accent bg-neutral' : ''
              }`}
            >
              {status.label}
            </Button>
          ))}

          <Button
            className="hidden lg:flex"
            effects="scale"
            variant="highlight"
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
              className="w-[50px] h-[50px] rounded-full shadow-lg flex items-center justify-center"
              effects="scale"
              variant="highlight"
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
