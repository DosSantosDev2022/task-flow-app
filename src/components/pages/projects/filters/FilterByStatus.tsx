'use client'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/global/popover'
import { useState } from 'react'
import { IoCheckmarkSharp, IoFilterCircle } from 'react-icons/io5'
import { LuX } from 'react-icons/lu'

const status = [
  {
    id: 'check01',
    label: 'Todos',
  },
  {
    id: 'check02',
    label: 'Pendentes',
  },
  {
    id: 'check03',
    label: 'Finalizados',
  },
]

export function FilterByStatus() {
  const [filterStatus, setFilterStatus] = useState<string[]>([])

  const handleStatusChange = (value: string) => {
    setFilterStatus((prev) => {
      if (prev.includes(value)) {
        return prev.filter((status) => status !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className='text-sm active:scale-95 duration-200'>
          <IoFilterCircle size={18} />
          <span className="text-sm font-medium">Status</span>
        </PopoverTrigger>

        <PopoverContent side='bottom' align='end'>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-medium ">Filtros</h3>
            <PopoverClose className='active:scale-95 p-1 border rounded-md hover:bg-zinc-200 duration-200'>
               <LuX size={16}/>
            </PopoverClose>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <ul className="space-y-3">
              {status.map((status, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-start gap-1.5"
                >
                  <input
                    type="checkbox"
                    className="peer relative h-5 w-5 shrink-0 appearance-none border cursor-pointer border-gray-300
                     rounded-md duration-300  bg-white checked:bg-violet-500 
                     hover:ring-1 hover:ring-violet-300 focus:outline-none"
                    id={status.id}
                    value={status.label}
                    onChange={() => handleStatusChange(status.label)}
                    checked={filterStatus.includes(status.label)}
                  />
                  <span className="absolute left-[2px] top-[2px] text-white opacity-0 
                    peer-checked:opacity-100 pointer-events-none">
                    <IoCheckmarkSharp size={16} />
                  </span>
                  <label
                    htmlFor={status.id}
                    className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
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
