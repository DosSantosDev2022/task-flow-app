'use client'

import { Input } from '@/components/global/Form/input'
import { CiSearch } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import { Project } from '@prisma/client'
import { useMemo } from 'react'
import { Avatar } from '@/components/global/avatar'
import { useRouter } from 'next/navigation'

type InputSearch = {
  search: string
}

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const { register, watch } = useForm<InputSearch>()
  const searchTerm = watch('search', '')
  const router = useRouter()

  const filteredProjects = useMemo(() => {
    if (projects.length > 0) {
      return projects.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return []
  }, [projects, searchTerm])

  const handleProjectClick = (id: string) => {
    router.push(`/tasks?projectId=${id}`)
  }

  return (
    <div className="col-span-1 md:col-span-3 px-2 py-3 border rounded-md shadow-sm h-full">
      <div className=" px-2 py-3">
        <Input.Root className="rounded-xl">
          <Input.Icon>
            <CiSearch size={24} className="text-secondary/50" />
          </Input.Icon>
          <Input.Input
            {...register('search')}
            placeholder="Buscar Projeto"
            aria-label="Buscar projetos"
          />
        </Input.Root>
      </div>

      <div className="flex flex-col gap-1 mt-2 overflow-y-auto max-h-80vh scrollbar-thin scrollbar-track-neutral scrollbar-thumb-accent p-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              onClick={() => handleProjectClick(project.id)}
              key={project.id}
              className="flex items-center justify-center gap-5 w-full border rounded-md shadow-sm hover:scale-105 duration-300 p-2 cursor-pointer"
            >
              <Avatar Alt="Icone do projeto" name={project.title} Url="" />
              <span className="text-primary font-medium text-sm w-full">
                {project.title}
              </span>
            </div>
          ))
        ) : (
          <span>Nenhum projeto encontrado!</span>
        )}
      </div>
    </div>
  )
}
