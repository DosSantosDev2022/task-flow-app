'use client'
import { Button } from '@/components/global/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/global/popover'
import { LuMoreVertical } from 'react-icons/lu'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { useNotification } from '@/contexts/NotificationContext'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import { Project } from '@prisma/client'
import { deleteProjectAction } from '@/app/actions/project/delete'
import { ModalEdit } from '@/components/pages/projects/editProject/ModalEdit'

interface TableActionsProps {
  project: Project
}

export function TableActions({ project }: TableActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteProject = async () => {
    try {
      setIsLoading(true)
      await deleteProjectAction(project.id)

      showNotification('Projeto excluído com sucesso!', 'success', 5000)
    } catch (error) {
      console.error('Erro ao excluir o projeto:', error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handleArchiveProject = async () => {}

  return (
    <>
      <Popover>
        <PopoverTrigger className="active:scale-75">
          <LuMoreVertical />
        </PopoverTrigger>
        <PopoverContent className="z-50 w-[130px]   overflow-hidden rounded-md border px-2 py-2.5 space-y-1">
          {/* Botão para arquivar projeto */}
          <Button
            onClick={handleArchiveProject}
            sizes="full"
            variant="outline"
            effects="scale"
          >
            Arquivar
          </Button>
          {/* Botão para editar projeto */}
          <ModalEdit projectId={project.id} />
          {/* Botão para deletar projeto */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button sizes="full" variant="danger" effects="scale">
                Deletar
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                  <FaSpinner className="animate-spin duration-500" />
                </div>
              )}
              <DialogHeader>
                <DialogDescription className="text-lg font-semibold">
                  <DialogTitle>
                    Você tem certeza que deseja excluír esse projeto ?
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
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </>
  )
}
