'use client'
import {
  PopoverTrigger,
  Popover,
  PopoverClose,
  PopoverContent,
} from '@/components/global/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoCheckmarkSharp, IoFilterCircle } from 'react-icons/io5'
import { LuX } from 'react-icons/lu'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/global/Form/input'
import { useForm } from 'react-hook-form'
import { useGetCities } from '@/hooks/useGetCities/useGetCities'

interface FilterByCityProps {
  stateParams?: string
}

interface SearchCitiesProps {
  search: string
}

export function FilterByCity({ stateParams }: FilterByCityProps) {
  const { cities } = useGetCities({ uf: stateParams })
  const { register, watch } = useForm<SearchCitiesProps>()
  const searchTerm = watch('search', '')
  // Definindo o estado dos checkboxes com base nos parâmetros da URL
  const [selectedCity, setSelectedCity] = useState<string[]>([])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const filteredCity = useMemo(() => {
    if (cities.length > 0) {
      return cities.filter((city) =>
        city.label.toLowerCase().includes(searchTerm),
      )
    }
  }, [searchTerm, cities])

  useEffect(() => {
    // Obtendo a prioridade selecionada dos parâmetros da URL
    const cityParam = searchParams.get('city')
    if (cityParam) {
      setSelectedCity([cityParam])
    } else {
      setSelectedCity([])
    }
  }, [searchParams])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams)
    const optionCheck = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      params.set('city', optionCheck)
    } else {
      params.delete('city')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="text-sm active:scale-95 duration-200">
          <IoFilterCircle size={18} />
          <span>Cidades</span>
        </PopoverTrigger>

        <PopoverContent className="" sideOffset={5} side="bottom" align="end">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-medium">Filtros</h3>
            <PopoverClose className="active:scale-95 p-1 border rounded-md hover:bg-neutral duration-200">
              <LuX size={16} />
            </PopoverClose>
          </div>
          <div className="mt-2">
            <Input.Root className="h-4">
              <Input.Input
                {...register('search')}
                className="placeholder:text-sm"
                placeholder="Buscar cidades..."
              />
            </Input.Root>
          </div>
          <div className="flex flex-col gap-2 mt-4 max-h-[350px] overflow-y-auto custom-scrollbar ">
            <ul className="space-y-3">
              {filteredCity?.map((city, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-start gap-1.5"
                >
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    className="peer relative h-5 w-5 cursor-pointer shrink-0 appearance-none border border-secondary/30 rounded-md duration-300  bg-light checked:bg-accent hover:ring-1 hover:ring-accent/50 focus:outline-none"
                    id={city.value}
                    value={city.label}
                    checked={selectedCity.includes(city.label)}
                  />
                  <span className="absolute left-[2px] top-[2px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <IoCheckmarkSharp size={16} />
                  </span>
                  <label
                    htmlFor={city.value}
                    className="text-sm text-secondary/50 ms-3"
                  >
                    {city.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
