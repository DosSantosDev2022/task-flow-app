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

export function EditProjectModal({
  isOpen,
  isOnChange,
}: EditProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={isOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Projeto</DialogTitle>
          <DialogDescription>
            Aqui você pode editar os detalhes do projeto.
          </DialogDescription>
        </DialogHeader>
        {/* Conteúdo do formulário de edição */}
        <div>Formulário de edição do projeto</div>
        <DialogFooter>
          <Button variant="Sucesss" onClick={isOnChange}>
            Salvar
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
