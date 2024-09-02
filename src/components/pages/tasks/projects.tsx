'use client'
import { Input } from '@/components/global/input'
import { CiSearch } from 'react-icons/ci'
import { ProjectCards } from './projectsCards'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Project } from '@prisma/client'

type InputSearch = {
  search: string
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const { register } = useForm<InputSearch>()
  const [searchTerm, setSearchTerm] = useState('')

  const projectlist = projects

  const filteredProjects = projectlist.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="col-span-3  px-2 py-3 border h-full ">
      <Input.Root className="rounded">
        <Input.Icon>
          <CiSearch size={24} className="text-zinc-400" />
        </Input.Icon>
        <Input.Input
          {...register('search')}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Projeto"
        />
      </Input.Root>

      <div className="flex flex-col gap-1 mt-2 overflow-y-auto max-h-[424px] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-600 p-2">
        {filteredProjects.map((p) => (
          <ProjectCards id={p.id} image="" name={p.title} key={p.id} />
        ))}
      </div>
    </div>
  )
}
