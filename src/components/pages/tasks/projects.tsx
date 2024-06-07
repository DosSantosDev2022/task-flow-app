'use client'
import { Input } from '@/components/global/input'
import { CiSearch } from 'react-icons/ci'
import { ProjectCards } from './projectsCards'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type InputSearch = {
  search: string
}

export function ProjectList() {
  const { register } = useForm<InputSearch>()
  const [searchTerm, setSearchTerm] = useState('')

  const listProject = [
    {
      name: 'Project 01',
      image: '',
    },
    {
      name: 'Project 02',
      image: '',
    },
    {
      name: 'Project 03',
      image: '',
    },
    {
      name: 'Project 04',
      image: '',
    },
    {
      name: 'Project 05',
      image: '',
    },
    {
      name: 'Project 06',
      image: '',
    },
    {
      name: 'Project 07',
      image: '',
    },
    {
      name: 'Project 08',
      image: '',
    },
    {
      name: 'Project 09',
      image: '',
    },
    {
      name: 'Project 10',
      image: '',
    },
  ]

  const filteredProjects = listProject.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <ProjectCards image="" name={p.name} key={p.name} />
        ))}
      </div>
    </div>
  )
}
