'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { BiX } from 'react-icons/bi'
import { FormClient } from './FormClient'
import { FaEdit } from 'react-icons/fa'
import { ClientData } from '@/@types/client'

export function ModalFormEdit({ client }: { client: ClientData }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger
        variant="outline"
        className="w-full px-3.5 py-2 h-8 flex items-center justify-start gap-1 rounded-md 
       active:scale-95"
      >
        <FaEdit size={16} />
        Editar
      </DialogTrigger>
      <DialogContent className="max-w-[720px] h-[620px]  overflow-auto scrollbar-thin">
        <DialogHeader className="h-16">
          <div className="flex items-center justify-between">
            <DialogTitle>
              Aqui você pode editar e visualizar o seu cliente
            </DialogTitle>
            <DialogClose className="rounded-md bg-light border hover:bg-neutral_hover active:scale-75 duration-300">
              <BiX size={25} />
            </DialogClose>
          </div>
          <DialogDescription>
            Veja as informações do seu cliente detalhadamente.
          </DialogDescription>
        </DialogHeader>

        <FormClient client={client} closeModal={() => setIsOpenModal(false)} />
      </DialogContent>
    </Dialog>
  )
}
