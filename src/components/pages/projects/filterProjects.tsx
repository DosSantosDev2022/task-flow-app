'use client'
import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { IoFilter } from 'react-icons/io5'
import { Button } from '@/components/global/button'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import {
  SelectProvider,
  SelectRoot,
  SelectTrigger,
  SelectOption,
  SelectContent,
} from '@/components/global/select'

export function FilterProjects() {
  const status = [
    {
      label: 'A fazer',
    },
    {
      label: 'Em andamento',
    },
    {
      label: 'Concluído',
    },
  ]

  return (
    <Popover.Root>
      <Popover.Trigger className="rounded-lg w-28 bg-transparent border px-2 py-3 text-zinc-700 flex items-center justify-center">
        <IoFilter />
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

            <div className="flex flex-col gap-1">
              <Label>Status</Label>
              <SelectProvider>
                <SelectRoot>
                  <SelectTrigger />
                  <SelectContent>
                    {status.map((status, index) => (
                      <SelectOption option={status.label} key={index} />
                    ))}
                  </SelectContent>
                </SelectRoot>
              </SelectProvider>
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
  )
}
