import { Button } from '@/components/global/button'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import * as Popover from '@radix-ui/react-popover'
import { IoFilterCircle } from 'react-icons/io5'

export function FilterByDate() {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger className="rounded-lg w-28 bg-transparent border px-1.5 py-2 text-zinc-700 gap-2 flex items-center justify-center">
          <IoFilterCircle />
          <span>Data</span>
        </Popover.Trigger>

        <Popover.PopoverPortal>
          <Popover.Content
            className="w-72 p-4 bg-white rounded-lg shadow-lg border"
            sideOffset={5}
          >
            <h3 className="text-base font-medium mb-2">Filtros</h3>

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

            <Popover.Close asChild>
              <Button sizes="full" variant="highlight" className="mt-4 text-md">
                Aplicar
              </Button>
            </Popover.Close>
          </Popover.Content>
        </Popover.PopoverPortal>
      </Popover.Root>
    </>
  )
}
