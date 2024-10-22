'use client'
import { Input } from '@/components/global/Form/input'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/global/popover'
import { useGetStates } from '@/hooks/useGetStates/useGetStates'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCheckmarkSharp, IoFilterCircle } from 'react-icons/io5'
import { LuX } from 'react-icons/lu'

interface InputSearchParams {
  search: string
}

export function FilterByState() {
  const { states } = useGetStates()
  const { register, watch } = useForm<InputSearchParams>()
  const searchTerm = watch('search', '')
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  const searchparams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const filteredState = useMemo(() => {
    if (states.length > 0) {
      return states.filter((state) =>
        state.label.toLowerCase().includes(searchTerm),
      )
    }

    return []
  }, [searchTerm, states])

  useEffect(() => {
    // Obtendo o status selecionado dos parâmetros da URL
    const statusParams = searchparams.get('state')

    // Verificando se statusParams é null e ajustando o estado
    if (statusParams) {
      setFilterStatus([statusParams])
    } else {
      setFilterStatus([])
    }
  }, [searchparams])

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchparams)
    const optionStatus = event.target.value
    const isChecked = event.target.checked

    if (optionStatus === 'TODOS') {
      params.delete('state')
      setFilterStatus([])
    } else {
      if (isChecked) {
        params.set('state', optionStatus)
      } else {
        params.delete('state')
      }
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="text-sm active:scale-95 duration-200">
          <IoFilterCircle size={18} />
          <span className="text-sm font-medium">Estados</span>
        </PopoverTrigger>

        <PopoverContent side="bottom" align="end">
          <div className="flex items-center justify-between w-full">
            <p className="text-base font-medium ">Filtros</p>
            <PopoverClose className="active:scale-95 p-1 border rounded-md hover:bg-neutral duration-200">
              <LuX size={16} />
            </PopoverClose>
          </div>
          <div className="mt-2">
            <Input.Root className="h-4">
              <Input.Input
                {...register('search')}
                className="placeholder:text-sm"
                placeholder="Buscar estados..."
              />
            </Input.Root>
          </div>
          <div className="flex flex-col gap-2 mt-4 max-h-[350px] overflow-y-auto custom-scrollbar">
            <ul className="space-y-3">
              {filteredState.map((status, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-start gap-1.5"
                >
                  <input
                    type="checkbox"
                    className="peer relative h-5 w-5 shrink-0 appearance-none border cursor-pointer border-secondary/30
                     rounded-md duration-300  bg-light checked:bg-accent 
                     hover:ring-1 hover:ring-accent/50 focus:outline-none"
                    id={status.value}
                    value={status.value}
                    onChange={handleStatusChange}
                    checked={filterStatus.includes(status.value)}
                  />
                  <span
                    className="absolute left-[2px] top-[2px] text-neutral opacity-0 
                    peer-checked:opacity-100 pointer-events-none"
                  >
                    <IoCheckmarkSharp size={16} />
                  </span>
                  <label
                    htmlFor={status.value}
                    className="text-sm text-secondary/50 ms-3 "
                  >
                    {status.label}
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
