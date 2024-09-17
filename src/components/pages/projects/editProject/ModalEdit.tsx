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
import { FormEditProject } from './FormEditProject'
import { FaEdit } from 'react-icons/fa'

export function ModalEdit({ projectId }: { projectId: string }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger
        className="w-full px-3.5 py-2 h-8 flex items-center justify-start gap-1 rounded-md bg-transparent border border-zinc-200 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition-all duration-500 
       active:scale-95"
      >
        <FaEdit size={16} />
        Editar
      </DialogTrigger>
      <DialogContent className="max-w-[720px] h-[620px] overflow-auto scrollbar-thin">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Aqui você pode registrar um novo projeto</DialogTitle>
            <DialogClose className="rounded-md bg-zinc-200 border hover:opacity-80 active:scale-75 duration-300">
              <BiX size={25} />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione as informações do seu projeto detalhadamente.
          </DialogDescription>
        </DialogHeader>

        <FormEditProject
          projectId={projectId}
          closeModal={() => setIsOpenModal(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
