import { Button } from '@/components/global/button'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/global/popover'
import { IoFilterCircle } from 'react-icons/io5'
import { LuX } from 'react-icons/lu'

export function FilterByDate() {
  return (
    <>
      <Popover>
        <PopoverTrigger className='text-sm active:scale-95 duration-200'>
          <IoFilterCircle size={18} />
          <span>Data</span>
        </PopoverTrigger>

        <PopoverContent
          className="w-72 p-4 bg-white rounded-lg shadow-lg border"
          sideOffset={5}
          side="bottom"
          align="end"
        >
          <div className='flex items-center w-full justify-between'>
            <h3 className="text-base font-medium mb-2">Filtros</h3>
            <PopoverClose className='active:scale-95 p-1 border rounded-md hover:bg-zinc-200 duration-200'>
               <LuX size={16}/>
            </PopoverClose>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label className="">Data de Início</Label>
              <Input.Root>
                <Input.Input className="text-sm" type="date" />
              </Input.Root>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="">Data de Fim</Label>
              <Input.Root>
                <Input.Input className="text-sm" type="date" />
              </Input.Root>
            </div>
          </div>
          <Button sizes="full" variant="highlight" className="mt-4 text-md">
            Aplicar
          </Button>
        </PopoverContent>
      </Popover>
    </>
  )
}
