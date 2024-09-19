import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Avatar } from '@/components/global/avatar'
import { ProgressBar } from '@/components/global/progressBar'
import { Deadiline } from '@/components/pages/tasks/deadline'
import { ProjectList } from '@/components/pages/tasks/ProjectList'
import { Tasks } from '@/components/pages/tasks/tasks'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const session = await getServerSession(authOptions)
  const projectId = searchParams.projectId

  if (!session) {
    return <p>Usuário não autenticado</p>
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
  })

  let selectedProject = null
  if (projectId) {
    selectedProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    })
    if (!selectedProject) {
      notFound()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-2 w-full">
      <ProjectList projects={projects} />

      <div className="col-span-1 md:col-span-9 border rounded-md shadow-sm w-full h-screen">
        {selectedProject ? (
          <>
            <div className="bg-zinc-50  sm:h-20 flex flex-col sm:flex-row items-start  sm:items-center space-y-2 sm:space-x-4 justify-between w-full p-2">
              <div className="flex items-center justify-start w-full gap-2">
                <Avatar
                  Alt={`Icone referente ao projeto:${selectedProject.title}`}
                  Url=""
                  name={selectedProject.title}
                />
                <div className="flex items-start gap-1 flex-col w-full">
                  <div className="text-zinc-600 font-normal text-md space-y-2 flex flex-col items-start justify-between w-full">
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="lg:text-xl text-sm font-bold text-zinc-600">
                        {selectedProject.title}
                      </h1>
                      <div className="text-xs bg-zinc-200 rounded-md px-1.5 py-1">
                        {selectedProject.tasks.length} tarefas
                      </div>
                    </div>
                    <ProgressBar
                      className="lg:w-[240px] w-[190px] "
                      value={60}
                    />
                  </div>
                </div>
              </div>
              <Deadiline.Root className="ml-10 sm:ml-0">
                <Deadiline.Icon />
                <Deadiline.Date
                  date={
                    selectedProject.endDate
                      ? format(
                          new Date(selectedProject.endDate),
                          'dd/MM/yyyy',
                          {
                            locale: ptBR,
                          },
                        )
                      : 'Data não disponível'
                  }
                />
              </Deadiline.Root>
            </div>

            <Tasks
              projectId={selectedProject.id}
              tasks={selectedProject.tasks}
            />
          </>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <p>Nenhum projeto selecionado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
