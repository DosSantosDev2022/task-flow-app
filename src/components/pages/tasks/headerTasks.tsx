'use client'

import { Avatar } from '@/components/global/avatar'
import { ProgressBar } from '@/components/global/progressBar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Deadiline } from './deadline'
import { useTaskStore } from '@/store/TaskStore'
import { calculateProgress } from '@/utils/calculateProgress'
import { useEffect, useState } from 'react'
import { Record } from '@prisma/client/runtime/library'
import { TaskStatus } from '@prisma/client'
import { ProjectData } from '@/@types/project'

export function HeaderTasks({
  selectedProject,
}: {
  selectedProject: ProjectData
}) {
  const { tasks } = useTaskStore() // Usando o estado global das tarefas
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    if (selectedProject) {
      // Mapeia as tasks do projeto para um Record de status
      const projectTasks = selectedProject.tasks.reduce<
        Record<string, TaskStatus>
      >((acc, task) => {
        // Prioriza o status dos dados no Zustand
        acc[task.id] = tasks[task.id] ? tasks[task.id].status : task.status
        return acc
      }, {})

      // Calcula o progresso com base no status das tasks
      const progress = calculateProgress(projectTasks)
      setProgressPercentage(progress)
    }
  }, [tasks, selectedProject])

  return (
    <>
      <div className="bg-light sm:h-20 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 justify-between w-full p-2">
        <div className="flex items-center justify-start w-full gap-2">
          <Avatar
            Alt={`Icone referente ao projeto: ${selectedProject.title}`}
            Url=""
            name={selectedProject.title}
          />
          <div className="flex items-start gap-1 flex-col w-full text-primary">
            <div className=" font-normal text-md space-y-2 flex flex-col items-start justify-between w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="lg:text-xl text-sm font-bold ">
                  {selectedProject.title}
                </h1>
                <div className="text-xs bg-neutral rounded-md px-1.5 py-1">
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
