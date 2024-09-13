import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Avatar } from '@/components/global/avatar'
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
    <div className="grid grid-cols-12 gap-2 p-2">
      <ProjectList projects={projects} />

      <div className="col-span-9 border w-full">
        {selectedProject ? (
          <>
            <div className="bg-zinc-50 h-20 flex items-center justify-between w-full p-2">
              <div className="flex items-center justify-start w-full gap-2">
                <Avatar Alt="" Url="" name={selectedProject.title} />
                <div className="flex items-start gap-1 flex-col w-[368px]">
                  <span className="text-zinc-600 font-normal text-md flex items-center justify-between w-full">
                    <h1>{selectedProject.title}</h1>
                    <div className="text-xs bg-zinc-200 rounded-md p-1">
                      {selectedProject.tasks.length} tarefas encontradas
                    </div>
                  </span>
                </div>
              </div>
              <Deadiline.Root>
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
          <p>Selecione um projeto para ver as tarefas.</p>
        )}
      </div>
    </div>
  )
}
