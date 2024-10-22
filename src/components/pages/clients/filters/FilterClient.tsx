'use client'
import React from 'react'
import { FilterByCity } from '@/components/pages/clients/filters/FilterByCity'
import { Input } from '@/components/global/Form/input'
import { CiSearch } from 'react-icons/ci'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterByDate } from './FilterByDate'
import { FilterByState } from './FilterByState'

export function FiltersClient() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const stateParams = searchParams.get('state') || ''

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
          <CiSearch size={24} className="text-secondary/50" />
        </Input.Icon>
        <Input.Input onChange={handleChange} placeholder="Buscar Clientes..." />
      </Input.Root>
      {/* Filtro por ordenação */}
      <FilterByDate />
      {/* Filtro por status */}
      <FilterByState />
      {/* Filtro por prioridades  */}
      <FilterByCity stateParams={stateParams} />
    </div>
  )
}
