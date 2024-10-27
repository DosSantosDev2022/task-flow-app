import { HeaderTasks } from '@/components/pages/tasks/headerTasks'
import { ProjectList } from '@/components/pages/tasks/ProjectList'
import { Tasks } from '@/components/pages/tasks/tasks'
import { getProjects } from '@/utils/getProjects'
import Loading from './loading'
import { ProjectStatus } from '@prisma/client'

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { projectId: string }
}) {
  const projectId = searchParams.projectId

  const { projects } = await getProjects({})

  if (!projects) {
    return <Loading />
  }

  // Filtra apenas projetos com status 'CONCLUIDO' ou 'PENDENTE'
  const filteredProjects = projects.filter(
    (project) =>
      project.status === ProjectStatus.CONCLUIDO ||
      project.status === ProjectStatus.PENDENTE,
  )

  let selectedProject = null
  if (projectId) {
    selectedProject = filteredProjects.find(
      (project) => project.id === projectId,
    )
    if (!selectedProject) {
      return <Loading />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-2 w-full">
      <ProjectList projects={filteredProjects} />

      <div className="col-span-1 md:col-span-9 border rounded-md shadow-sm w-full h-full">
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
