import * as Popover from '@radix-ui/react-popover'
import { IoCheckmarkSharp, IoFilter } from 'react-icons/io5'
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
      <Popover.Root>
        <Popover.Trigger className="rounded-lg w-28 bg-transparent border px-1.5 py-2 text-zinc-700 gap-2 flex items-center justify-center">
          <IoFilter />
          <span>Status</span>
        </Popover.Trigger>

        <Popover.PopoverPortal>
          <Popover.Content
            className="w-72 p-4 bg-white rounded-lg shadow-lg border"
            sideOffset={5}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-base font-medium ">Filtros</h3>
              <Popover.Close>
                <LuX />
              </Popover.Close>
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
                      className="peer relative h-5 w-5 shrink-0 appearance-none border border-gray-300 rounded-md duration-300  bg-white checked:bg-violet-500 hover:ring-1 hover:ring-violet-300 focus:outline-none"
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
          </Popover.Content>
        </Popover.PopoverPortal>
      </Popover.Root>
    </>
  )
}
