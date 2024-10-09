'use client'

import { useState } from 'react'
import { LuMoreVertical } from 'react-icons/lu'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/global/popover'
import { ModalFormEdit } from '@/components/pages/clients/editClient/ModalFormEdit'
import { ClientData } from '@/utils/getClients'
import { ArchiveAction } from './ArchiveAction'
import { DeleteAction } from './DeleteAction'

export const Actions = ({ client }: { client: ClientData }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover>
      <PopoverTrigger className="active:scale-95">
        <LuMoreVertical />
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[130px] overflow-hidden rounded-md border px-1.5 py-2 space-y-1.5">
        <ArchiveAction clientId={client.id} />
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
