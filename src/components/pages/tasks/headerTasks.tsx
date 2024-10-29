'use client'

import { Avatar } from '@/components/global/avatar'
import { ProgressBar } from '@/components/global/progressBar'
import { format, isAfter } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Deadiline } from './deadline'
import { useTaskStore } from '@/store/TaskStore'
import { calculateProgress } from '@/utils/calculateProgress'
import { useEffect, useState } from 'react'
import { Record } from '@prisma/client/runtime/library'
import { TaskStatus } from '@prisma/client'
import { ProjectData } from '@/@types/project'
import { Badge } from '@/components/global/badge'
import { Button } from '@/components/global/button'
import { useNotification } from '@/contexts/NotificationContext'
import { ArchiveProject } from '@/app/actions/project/archiveProject'
import { useRouter } from 'next/navigation'

export function HeaderTasks({
  selectedProject,
}: {
  selectedProject: ProjectData
}) {
  const router = useRouter()
  const { tasks } = useTaskStore() // Usando o estado global das tarefas
  const { showNotification } = useNotification()
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

  // Função para verificar se está dentro do prazo

  const isWithinDeadline = () => {
    if (!selectedProject.endDate) return false
    const endDate = new Date(selectedProject.endDate)
    return isAfter(endDate, new Date())
  }

  const handleArchiveproject = async () => {
    try {
      const response = await ArchiveProject({
        id: selectedProject.id,
        newStatus: 'ARQUIVADO',
      })

      if (response.success) {
        // Redireciona para a página de tarefas
        router.push('/tasks')
      }
      showNotification('Projeto arquivado com sucesso', 'success')
    } catch (error) {
      showNotification('Erro ao arquivar projeto', 'error')
      console.error('Erro ao arquivar projeto')
    }
  }

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
            <div className="font-normal text-md space-y-2 flex flex-col items-start justify-between w-full">
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
        <div className="flex flex-col items-end gap-2 w-full ">
          <Deadiline.Root className="ml-10 sm:ml-0">
            <Deadiline.Icon
              className={isWithinDeadline() ? 'bg-green-500' : 'bg-red-500'}
              prazo={isWithinDeadline() ? 'No prazo' : 'Fora do prazo'}
            />
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

          <div className="flex items-center justify-end w-full gap-1">
            <Badge status={selectedProject.status} />

            {progressPercentage === 100 &&
              selectedProject.status === 'CONCLUIDO' && (
                <Button
                  effects="scale"
                  variant="primary"
                  onClick={handleArchiveproject}
                  className="w-[65px] h-[22px] px-1.5 py-[2px] rounded-2xl text-neutral
          text-[10px] font-normal leading-7 flex items-center justify-center"
                >
                  Arquivar
                </Button>
              )}
          </div>
        </div>
      </div>
    </>
  )
}
