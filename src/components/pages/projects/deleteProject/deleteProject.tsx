'use client'
import { deleteProjectAction } from '@/app/actions/project/delete'
import { Button } from '@/components/global/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/global/modal'
import { useNotification } from '@/contexts/NotificationContext'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

interface DeleteProjectProps {
  id: string
}

export function DeleteProject({ id }: DeleteProjectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteProjectAction(id)

      showNotification('Projeto excluído com sucesso!', 5000)
    } catch (error) {
      console.error('Erro ao excluir o projeto:', error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="hover:scale-105 duration-200"
            variant="danger"
            sizes="icon"
          >
            <MdDeleteForever size={14} />
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
              Você tem certeza que deseja excluír esse projeto ?
            </DialogDescription>

            <div className="flex gap-2 mt-2">
              <Button variant="danger" onClick={handleDelete}>
                Excluir
              </Button>
              <DialogClose>
                <Button variant="outline">Cancelar</Button>
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
