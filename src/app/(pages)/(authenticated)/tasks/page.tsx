import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { HeaderTasks } from '@/components/pages/tasks/headerTasks'
import { ProjectList } from '@/components/pages/tasks/ProjectList'
import { Tasks } from '@/components/pages/tasks/tasks'
import { prisma } from '@/lib/prisma'
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
            {/* Cabeçalho que mostra o projeto acessado  */}
            <HeaderTasks selectedProject={selectedProject} />

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
