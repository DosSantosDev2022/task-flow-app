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
import { BiPlus, BiX } from 'react-icons/bi'
import { ProjectCreationForm } from './ProjectForm'

export function ProjectCreationModal() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger
        className="w-[130px] flex items-center justify-center gap-1 rounded-md bg-violet-700 hover:bg-violet-500 duration-500 text-zinc-50 px-1 py-2
       active:scale-95"
      >
        <span className="text-sm font-semibold">Novo Projeto</span>
        <BiPlus size={20} className="font-bold" />
      </DialogTrigger>
      <DialogContent className="max-w-[720px] h-[620px] flex flex-col justify-center space-y-3 overflow-auto scrollbar-thin">
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

        <ProjectCreationForm closeModal={() => setIsOpenModal(false)} />
      </DialogContent>
    </Dialog>
  )
}
