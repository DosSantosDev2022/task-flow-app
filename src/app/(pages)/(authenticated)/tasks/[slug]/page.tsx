import { Avatar } from '@/components/global/avatar'
import { Deadiline } from '@/components/pages/tasks/deadline'
import { ProgressBar } from '@/components/pages/tasks/progressBar'
import { Tasks } from '@/components/pages/tasks/tasks'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface TasksPageParams {
  params: {
    slug: string
  }
}

async function getTasks({ params }: TasksPageParams) {
  try {
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''

    // Busca o projeto pelo slug
    const projectRes = await fetch(`${baseUrl}/api/projects/${params.slug}`)
    if (!projectRes) {
      throw new Error('Erro ao buscar tarefas')
    }

    const project = await projectRes.json()

    // Busca as tarefas associadas ao projeto
    const tasksRes = await fetch(`${baseUrl}/api/tasks/${params.slug}`)
    if (!tasksRes) {
      throw new Error('Erro ao buscar tarefas')
    }

    const tasks = await tasksRes.json()

    // Retorna o projeto e as tarefas
    return { project, tasks }

  } catch (error) {
    console.error('Erro ao buscar tarefas', error)
    return { project: null, tasks: [] }
  }
}

export default async function TasksPage({ params }: TasksPageParams) {
  const { project, tasks } = await getTasks({ params })
  
  return (
    <>
      <div className="bg-zinc-50 h-20 flex items-center justify-between w-full p-2">
        <div className="flex items-center justify-start  w-full gap-2">
         <Avatar Alt='' Url='' name={project.title} />
          <div className="flex items-start gap-1 flex-col w-[368px]">
            <span className="text-zinc-600 font-normal text-md flex items-center justify-between w-full">
              <h1>
                {project.title}
              </h1>
              <div className="text-xs bg-zinc-200 rounded-md p-1">
                35% completado
              </div>
            </span>

            <ProgressBar />
          </div>
        </div>
        <Deadiline.Root>
          <Deadiline.Icon />
          <Deadiline.Date date={project.endDate
            ? format(
              new Date(project.endDate),
              "dd/MM/yyyy",
              { locale: ptBR },
            )
            : 'Data não disponível'} />
        </Deadiline.Root>
      </div>

      <Tasks projectId={project.id} tasks={tasks || []} />
    </>
  )
}
