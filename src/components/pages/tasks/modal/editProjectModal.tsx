import { Button } from '@/components/global/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/global/modal'
import { Project } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface EditProjectModalProps {
  isOpen: boolean
  isOnChange: () => void
  projectData: Project
}

export function EditProjectModal({
  isOpen,
  isOnChange,
  projectData,
}: EditProjectModalProps) {
  const router = useRouter()

  const handleEditProject = () => {
    router.push(`/edit-project/${projectData.id}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Projeto</DialogTitle>
          <DialogDescription>
            Aqui estão os detalhes do projeto.
          </DialogDescription>
        </DialogHeader>
        {/* Conteúdo para visualização */}
        <div className="mt-4 text-sm">
          <div className="px-1 py-2">
            <p>
              <strong>Nome:</strong> {projectData.title}
            </p>
            <p>
              <strong>Descrição:</strong> {projectData.description}
            </p>
          </div>
          <div className="flex gap-2 items-center border justify-center px-1 py-2">
            <p>
              <strong>Data de início:</strong>
              {projectData.startDate
                ? format(
                    new Date(projectData.startDate),
                    "dd 'de' MMM 'de' yyyy",
                    { locale: ptBR },
                  )
                : 'Data não disponível'}
            </p>
            <p>
              <strong>Prazo de entrega:</strong>
              {projectData.endDate
                ? format(
                    new Date(projectData.endDate),
                    "dd 'de' MMM 'de' yyyy",
                    { locale: ptBR },
                  )
                : 'Data não disponível'}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="Sucesss" onClick={handleEditProject}>
            Editar
          </Button>
          <Button variant="outline" onClick={isOnChange}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
