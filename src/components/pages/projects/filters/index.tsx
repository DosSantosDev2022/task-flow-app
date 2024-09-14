'use client'
import React from 'react'
import { FilterByStatus } from '@/components/pages/projects/filters/FilterByStatus'
import { FilterByPriority } from '@/components/pages/projects/filters/FilterByPriority'
import { Input } from '@/components/global/Form/input'
import { CiSearch } from 'react-icons/ci'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterByDate } from './FilterByDate'

export function FilterProjects() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams)
    const searchString = event.currentTarget.value

    if (searchString) {
      params.set('search', searchString)
    } else {
      params.delete('search')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Filtro por pesquisa textual */}
      <Input.Root className="h-9">
        <Input.Icon>
          <CiSearch size={24} className="text-zinc-400" />
        </Input.Icon>
        <Input.Input onChange={handleChange} placeholder="Buscar projetos..." />
      </Input.Root>
      {/* Filtro por ordenação */}
      <FilterByDate />
      {/* Filtro por status */}
      <FilterByStatus />
      {/* Filtro por prioridades  */}
      <FilterByPriority />
    </div>
  )
}
