import {
  PopoverTrigger,
  Popover,
  PopoverClose,
  PopoverContent,
} from '@/components/global/popover'
import { IoCheckmarkSharp, IoFilterCircle } from 'react-icons/io5'
import { LuX } from 'react-icons/lu'

export function FilterByPriority() {
  const priorities = [
    {
      id: 'check01',
      label: 'Baixa',
    },
    {
      id: 'check02',
      label: 'Média',
    },
    {
      id: 'check03',
      label: 'Alta',
    },
  ]

  return (
    <>
      <Popover>
        <PopoverTrigger className='text-sm active:scale-95 duration-200'>
          <IoFilterCircle size={18} />
          <span>Prioridades</span>
        </PopoverTrigger>

        <PopoverContent sideOffset={5} side="bottom" align="end">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-medium ">Filtros</h3>
            <PopoverClose className='active:scale-95 p-1 border rounded-md hover:bg-zinc-200 duration-200'>
               <LuX size={16}/>
            </PopoverClose>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <ul className="space-y-3">
              {priorities.map((status, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-start gap-1.5"
                >
                  <input
                    type="checkbox"
                    className="peer relative h-5 w-5 cursor-pointer shrink-0 appearance-none border border-gray-300 rounded-md duration-300  bg-white checked:bg-violet-500 hover:ring-1 hover:ring-violet-300 focus:outline-none"
                    id={status.id}
                  />
                  <span className="absolute left-[2px] top-[2px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
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
