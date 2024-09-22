'use client'
import { useState, Dispatch, SetStateAction } from 'react'
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
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/global/modal'
import { ModalEdit } from '@/components/pages/projects/editProject/ModalEdit'
import { useNotification } from '@/contexts/NotificationContext'
import { deleteProjectAction } from '@/app/actions/project/delete'

// Componente para exibir o estado de loading
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <FaSpinner className="animate-spin duration-500" />
    </div>
  )
}

// Função para deletar o projeto
const useDeleteProject = (
  projectId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const { showNotification } = useNotification()

  const handleDeleteProject = async () => {
    setIsLoading(true)
    try {
      await deleteProjectAction(projectId)
      showNotification('Projeto excluído com sucesso!', 'success', 5000)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao excluir o projeto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return handleDeleteProject
}

// Props para o botão de arquivar
interface ArchiveButtonProps {
  onClick: () => void
}

// Componente do botão de arquivar projeto
function ArchiveButton({ onClick }: ArchiveButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full h-8 flex items-center justify-start gap-1"
      variant="outline"
      effects="scale"
    >
      <IoArchive size={16} />
      Arquivar
    </Button>
  )
}

// Props para o botão de deletar
interface DeleteButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  handleDeleteProject: () => void
}

// Componente do botão de deletar projeto com modal
function DeleteButton({
  isOpen,
  setIsOpen,
  isLoading,
  handleDeleteProject,
}: DeleteButtonProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-8 justify-start" variant="outline">
        <MdDelete size={16} />
        Deletar
      </DialogTrigger>
      <DialogContent>
        {isLoading && <LoadingOverlay />}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">
            Você tem certeza que deseja excluir este projeto?
          </DialogTitle>
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
  )
}

// Props para o componente principal
interface TableActionsProps {
  project: Project
}

// Componente principal
export function TableActions({ project }: TableActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteProject = useDeleteProject(
    project.id,
    setIsOpen,
    setIsLoading,
  )
  const handleArchiveProject = async () => {
    // Lógica para arquivar o projeto
  }

  return (
    <Popover>
      <PopoverTrigger className="active:scale-95">
        <LuMoreVertical />
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[130px] overflow-hidden rounded-md border px-1.5 py-2 space-y-1.5">
        <ArchiveButton onClick={handleArchiveProject} />
        <ModalEdit projectId={project.id} />
        <DeleteButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          handleDeleteProject={handleDeleteProject}
        />
      </PopoverContent>
    </Popover>
  )
}
