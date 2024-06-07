import { PiPlus } from 'react-icons/pi'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import { Button } from '@/components/global/button'
import TextArea from '@/components/global/textArea'

export function AddNewTasksModal() {
  return (
    <Dialog>
      <DialogTrigger className="bg-violet-600 w-40 rounded-2xl px-2 py-3 text-zinc-50 justify-center  flex gap-1 items-center">
        <PiPlus />
        <span className="text-base">Nova tarefa</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-600">
            Adicione uma nova tarefa
          </DialogTitle>
        </DialogHeader>

        <form className="overflow-y-auto overflow-x-hidden max-h-[468px]">
          <div className="flex flex-col gap-3 px-1 py-2 ">
            <div className="flex flex-col gap-1">
              <Label>Nome da tarefa</Label>
              <Input.Root className="rounded">
                <Input.Input
                  type="text"
                  placeholder="Digite o nome da sua tarefa"
                />
              </Input.Root>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Projeto</Label>
              <Input.Root className="rounded">
                <Input.Input placeholder="Digite o nome da sua tarefa" />
              </Input.Root>
            </div>
            <div className="flex gap-2 justify-between w-full">
              <div className="flex flex-col gap-1">
                <Label>Data inicial</Label>
                <Input.Root className="rounded">
                  <Input.Input
                    type="date"
                    placeholder="Digite o nome da sua tarefa"
                  />
                </Input.Root>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Data de entrega</Label>
                <Input.Root className="rounded">
                  <Input.Input
                    type="date"
                    placeholder="Digite o nome da sua tarefa"
                  />
                </Input.Root>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Descrição da tarefa</Label>
              <TextArea />
            </div>

            <div className="w-full flex items-center gap-2 justify-end p-2">
              <Button variant="highlight">Cadastrar</Button>
              <Button variant="danger">Cancelar</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
