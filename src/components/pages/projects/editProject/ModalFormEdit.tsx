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
import { FormProject } from './FormProject'
import { FaEdit } from 'react-icons/fa'
import { ProjectData } from '@/@types/project'

export function ModalFormEdit({ project }: { project: ProjectData }) {
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
      <DialogContent className="max-w-[720px] h-[620px]  overflow-auto scrollbar-thin">
        <DialogHeader className="h-16">
          <div className="flex items-center justify-between">
            <DialogTitle>
              Aqui você pode editar e visualizar o seu projeto
            </DialogTitle>
            <DialogClose sizes="icon" variant="outline">
              X
            </DialogClose>
          </div>
          <DialogDescription>
            Veja as informações do seu projeto detalhadamente.
          </DialogDescription>
        </DialogHeader>

        <FormProject
          project={project}
          closeModal={() => setIsOpenModal(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
