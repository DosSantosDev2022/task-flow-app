import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { HeaderTasks } from '@/components/pages/tasks/headerTasks'
import { ProjectList } from '@/components/pages/tasks/ProjectList'
import { Tasks } from '@/components/pages/tasks/tasks'
import { getProjects } from '@/utils/getProjects'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { projectId: string }
}) {
  const session = await getServerSession(authOptions)
  const projectId = searchParams.projectId

  if (!session) {
    return <p>Usuário não autenticado</p>
  }

  const { projects } = await getProjects({
    page: 1,
    limit: 1000, // limite de resultados
    session, // a sessão do usuário
    sortBy: 'createdAt',
  })

  let selectedProject = null
  if (projectId) {
    selectedProject = projects.find((project) => project.id === projectId)
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
