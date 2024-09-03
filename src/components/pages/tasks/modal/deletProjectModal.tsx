import { Button } from '@/components/global/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/global/modal'

interface EditProjectModalProps {
  isOpen: boolean
  isOnChange: () => void
}

export function DeleteProjectModal({
  isOpen,
  isOnChange,
}: EditProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={isOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Projeto</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este projeto?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="danger" onClick={isOnChange}>
            Excluir
          </Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={isOnChange}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
