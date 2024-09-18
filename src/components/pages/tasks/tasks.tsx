'use client'
import { useState, useCallback, useEffect } from 'react'
import { TaskByStatus } from './TaskByStatus'
import { Task, TaskStatus } from '@prisma/client'
import { TaskAddForm } from './TaskAddForm'
import { Button } from '@/components/global/button'
import { useTaskStatusStore } from '@/store/TaskStatusStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
  const { taskStatuses, updateTaskStatus, saveAllChanges } =
    useTaskStatusStore()

  useEffect(() => {
    // Initialize the task statuses from tasks prop
    tasks.forEach((task) => {
      if (!taskStatuses[task.id]) {
        updateTaskStatus(task.id, task.status)
      }
    })
  }, [tasks, taskStatuses, updateTaskStatus])

  // Atualiza o filtro quando `taskStatuses` mudar
  useEffect(() => {
    console.log('Task statuses updated:', taskStatuses)
  }, [taskStatuses])

  // Filtra tarefas de acordo com o filtro atual
  const filteredTasks = (filter: FilterType) => {
    if (filter === 'all') {
      // Organize tasks into a status-based grouping
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
    // Return tasks filtered by specific status
    return {
      [filter]: tasks.filter((task) => task.status === filter),
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
      await saveAllChanges()
    } catch (error) {
      console.error('Error saving changes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para adicionar uma nova tarefa à lista
  const handleAddTask = useCallback(
    (newTask: Task) => {
      updateTaskStatus(newTask.id, newTask.status)
    },
    [updateTaskStatus],
  )

  return (
    <DndProvider backend={HTML5Backend}>
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
        {['A_FAZER', 'EM_ANDAMENTO', 'CONCLUIDO'].map((status, index) => (
          <div key={index} className="col-span-4">
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
