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
import { ProjectCreationForm } from './ProjectForm'

export function ProjectCreationModal() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger className="w-[120px] active:scale-95 duration-200">
        Novo Projeto
      </DialogTrigger>
      <DialogContent className="max-w-[768px] h-[568px] overflow-auto scrollbar-thin">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Vamos criar um novo projeto</DialogTitle>
            <DialogClose className="rounded-md bg-zinc-200 border hover:opacity-80 active:scale-75 duration-300">
              <BiX size={25} />
            </DialogClose>
          </div>
          <DialogDescription>
            Make changes to your profile here. Click save when you’re done.
          </DialogDescription>
        </DialogHeader>

        <ProjectCreationForm closeModal={() => setIsOpenModal(false)} />
      </DialogContent>
    </Dialog>
  )
}
