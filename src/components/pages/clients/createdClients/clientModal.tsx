'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { BiPlus } from 'react-icons/bi'
import { ClientForm } from './clientForm.tsx'

export function ClientModal() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger
        className="w-[130px] flex items-center justify-center gap-1 rounded-md bg-accent hover:bg-accent/90 duration-500 text-neutral px-1 py-2
       active:scale-95"
      >
        <span className="text-sm font-semibold">Novo Cliente</span>
        <BiPlus size={20} className="font-bold" />
      </DialogTrigger>
      <DialogContent className="max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Cadastre o seu novo cliente</DialogTitle>
          <DialogDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>

        <ClientForm closeModal={() => setIsOpenModal(false)} />
      </DialogContent>
    </Dialog>
  )
}
