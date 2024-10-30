'use client'

import { useState } from 'react'
import { LuMoreVertical } from 'react-icons/lu'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/global/popover'
import { ModalFormEdit } from '@/components/pages/clients/editClient/ModalFormEdit'
import { DeleteAction } from './DeleteAction'
import { ClientData } from '@/@types/client'

export const Actions = ({ client }: { client: ClientData }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover>
      <PopoverTrigger className="active:scale-95">
        <LuMoreVertical />
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[130px] overflow-hidden rounded-md border px-1.5 py-2 space-y-1.5">
        <ModalFormEdit client={client} />
        <DeleteAction
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          clientId={client.id}
        />
      </PopoverContent>
    </Popover>
  )
}
