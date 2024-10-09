import { Button } from '@/components/global/button'
import { IoArchive } from 'react-icons/io5'

interface ArchiveButtonProps {
  projectId: string
}

const handleArchiveProject = async () => {
  // Lógica para arquivar o projeto
}

export const ArchiveAction = ({ projectId }: ArchiveButtonProps) => (
  <Button
    onClick={handleArchiveProject}
    className="w-full h-8 flex items-center justify-start gap-1"
    variant="outline"
    effects="scale"
  >
    <IoArchive size={16} />
    Arquivar
  </Button>
)
