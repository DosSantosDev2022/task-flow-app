'use client'

import { Avatar } from '@/components/global/avatar'
import { ProgressBar } from '@/components/global/progressBar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Deadiline } from './deadline'
import { useTaskStatusStore } from '@/store/TaskStatusStore'
import { calculateProgress } from '@/utils/calculateProgress'
import { useEffect, useState } from 'react'
import { Record } from '@prisma/client/runtime/library'

// Tipagem do selectedProject e das tasks
interface Task {
  id: string
  status: 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'
}

interface Project {
  title: string
  endDate: Date
  tasks: Task[]
}

export function HeaderTasks({ selectedProject }: { selectedProject: Project }) {
  const { taskStatuses } = useTaskStatusStore() // Usando o estado global das tarefas
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    if (selectedProject) {
      const projectTasks = selectedProject.tasks.reduce<
        Record<string, 'A_FAZER' | 'EM_ANDAMENTO' | 'CONCLUIDO'>
      >((acc, task) => {
        acc[task.id] =
          taskStatuses[task.id] !== undefined
            ? taskStatuses[task.id]
            : task.status
        return acc
      }, {})

      const progress = calculateProgress(projectTasks)
      setProgressPercentage(progress)
    }
  }, [taskStatuses, selectedProject])

  return (
    <>
      <div className="bg-zinc-50 sm:h-20 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 justify-between w-full p-2">
        <div className="flex items-center justify-start w-full gap-2">
          <Avatar
            Alt={`Icone referente ao projeto: ${selectedProject.title}`}
            Url=""
            name={selectedProject.title}
          />
          <div className="flex items-start gap-1 flex-col w-full text-zinc-600">
            <div className=" font-normal text-md space-y-2 flex flex-col items-start justify-between w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="lg:text-xl text-sm font-bold ">
                  {selectedProject.title}
                </h1>
                <div className="text-xs bg-zinc-200 rounded-md px-1.5 py-1">
                  {selectedProject.tasks.length} tarefas
                </div>
              </div>
              <ProgressBar
                className="lg:w-[240px] w-[190px]"
                value={progressPercentage}
              />
            </div>
          </div>
        </div>
        <Deadiline.Root className="ml-10 sm:ml-0">
          <Deadiline.Icon />
          <Deadiline.Date
            date={
              selectedProject.endDate
                ? format(new Date(selectedProject.endDate), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })
                : 'Data não disponível'
            }
          />
        </Deadiline.Root>
      </div>
    </>
  )
}
