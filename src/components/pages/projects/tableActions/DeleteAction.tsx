import { Dispatch, SetStateAction, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { Button } from '@/components/global/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/global/modal'
import { LoadingOverlay } from './LoadingOverlay'
import { useNotification } from '@/contexts/NotificationContext'
import { deleteProjectAction } from '@/app/actions/project/delete'

interface DeleteButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  projectId: string
}

export function DeleteAction({
  isOpen,
  setIsOpen,
  projectId,
}: DeleteButtonProps) {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteClient = async () => {
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
              onClick={handleDeleteClient}
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
