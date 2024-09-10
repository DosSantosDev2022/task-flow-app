'use client'
import React from 'react'
import { FilterByStatus } from './FilterByStatus'
import { FilterByDate } from './FilterByDate'
import { FilterByPriority } from './FilterByPriority'
import { Input } from '@/components/global/input'
import { CiSearch } from 'react-icons/ci'
import { Project } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface FilterProjectsProps {
  projects: Project[]
}

export function FilterProjects({ projects }: FilterProjectsProps) {
  const  searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams
    const searchString = event.currentTarget.value

    if(searchString) {
      params.set('search', searchString)
    } else {
      params.delete('search')
    }
   

    replace(`${pathname}?${params.toString()}`)
  }
  
  

  return (
    <div className="flex items-center gap-2">
      {/*  Filtro por pesquisa */}
      <Input.Root>
        <Input.Icon>
          <CiSearch size={24} className="text-zinc-400" />
        </Input.Icon>
        <Input.Input
        onChange={handleChange} 
         placeholder="Buscar projetos..."
        />
      </Input.Root>

      {/*  Filtro por data */}
      <FilterByDate />

      {/*  Filtro por statis */}
      <FilterByStatus />
      {/*  Filtro por Prioridades */}
      <FilterByPriority />
    </div>
  )
}
