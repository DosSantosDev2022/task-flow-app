'use client'

import { Input } from '@/components/global/input'
import { CiSearch } from 'react-icons/ci'
import { ProjectCards } from './projectsCards'
import { useForm } from 'react-hook-form'
import { Project } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { SkeletonProjectListCards } from './skeletons/SkeletonProjectList'

type InputSearch = {
  search: string
}

async function getProjects() {
  try {
    const baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''
    const res = await fetch(`${baseUrl}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar projetos')
    }

    const data = await res.json()
    console.log('Projetos obtidos:', data) // Log dos dados recebidos
    return data.projects // Acessar a chave 'projects'
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return []
  }
}

export function ProjectList() {
  const { register, watch } = useForm<InputSearch>()
  const [project, setProject] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const searchTerm = watch('search', '')

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const projects = await getProjects()
      setProject(projects)
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    if (project.length > 0) {
      return project.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return []
  }, [project, searchTerm])

  if (loading) return <SkeletonProjectListCards />

  return (
    <div className="col-span-3 px-2 py-3 border h-full">
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
            <ProjectCards
              key={project.id}
              slug={project.slug}
              id={project.id}
              title={project.title}
              description={project.description}
              endDate={project.endDate}
              startDate={project.startDate}
              userId={project.userId}
              price={project.price}
              payment={'CREDITO'}
              clientId={null}
            />
          ))
        ) : (
          <span>Nenhum projeto encontrado!</span>
        )}
      </div>
    </div>
  )
}
