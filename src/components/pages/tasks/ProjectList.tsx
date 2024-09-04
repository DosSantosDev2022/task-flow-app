'use client'
import { Input } from '@/components/global/input'
import { CiSearch } from 'react-icons/ci'
import { ProjectCards } from './projectsCards'
import { useForm } from 'react-hook-form'
import { Project } from '@prisma/client'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { SkeletonProjectListCards } from './skeletons/SkeletonProjectList'

type InputSearch = {
  search: string
}

export function ProjectList() {
  const { register, watch } = useForm<InputSearch>()
  const [project, setProject] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const searchTerm = watch('search', '')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/project')
        if (!response.ok) {
          throw new Error('Falha ao buscar projetos, verifique!')
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        throw new Error('Falha ao buscar projetos')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    return project.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [project, searchTerm])

  if (loading) return <SkeletonProjectListCards />

  return (
    <div className="col-span-3  px-2 py-3 border h-full ">
      <Input.Root className="rounded">
        <Input.Icon>
          <CiSearch size={24} className="text-zinc-400" />
        </Input.Icon>
        <Input.Input
          {...register('search')}
          placeholder="Buscar Projeto"
          aria-label="Buscar projetos"
        />
      </Input.Root>

      <div className="flex flex-col gap-1 mt-2 overflow-y-auto max-h-[424px] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-600 p-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Suspense key={project.id} fallback={<SkeletonProjectListCards />}>
              <ProjectCards
                slug={project.slug}
                id={project.id}
                title={project.title}
                description={project.description}
                endDate={project.endDate}
                startDate={project.startDate}
                userId={project.userId}
              />
            </Suspense>
          ))
        ) : (
          <span>Nenhum projeto encontrado !</span>
        )}
      </div>
    </div>
  )
}
