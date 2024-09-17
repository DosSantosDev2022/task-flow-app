'use client'

import { useState } from 'react'
import { LuMoreVertical } from 'react-icons/lu'
import { IoArchive } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { Project } from '@prisma/client'

import { Button } from '@/components/global/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/global/popover'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/global/modal'

import { ModalEdit } from '@/components/pages/projects/editProject/ModalEdit'
import { useNotification } from '@/contexts/NotificationContext'
import { deleteProjectAction } from '@/app/actions/project/delete'

interface TableActionsProps {
  project: Project
}

export function TableActions({ project }: TableActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()

  const handleDeleteProject = async () => {
    setIsLoading(true)
    try {
      await deleteProjectAction(project.id)
      showNotification('Projeto excluído com sucesso!', 'success', 5000)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao excluir o projeto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchiveProject = async () => {
    // Lógica para arquivar o projeto
  }

  return (
    <Popover>
      <PopoverTrigger className="active:scale-95">
        <LuMoreVertical />
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[130px] overflow-hidden rounded-md border px-1.5 py-2 space-y-1.5">
        <Button
          onClick={handleArchiveProject}
          className="w-full h-8 flex items-center justify-start gap-1"
          variant="outline"
          effects="scale"
        >
          <IoArchive size={16} />
          Arquivar
        </Button>

        <ModalEdit projectId={project.id} />

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full h-8 flex items-center justify-start gap-1"
              variant="outline"
              effects="scale"
            >
              <MdDelete size={16} />
              Deletar
            </Button>
          </DialogTrigger>
          <DialogContent>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                <FaSpinner className="animate-spin duration-500" />
              </div>
            )}
            <DialogHeader>
              <DialogDescription>
                <DialogTitle className="text-lg font-semibold mb-2">
                  Você tem certeza que deseja excluir este projeto?
                </DialogTitle>
              </DialogDescription>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="danger"
                  effects="scale"
                  onClick={handleDeleteProject}
                  disabled={isLoading}
                >
                  Excluir
                </Button>
                <DialogClose>
                  <Button effects="scale" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  )
}
