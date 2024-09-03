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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SelectContent,
  SelectInput,
  SelectOption,
  SelectProvider,
  SelectRoot,
  SelectTrigger,
} from '@/components/global/select'

export function AddNewTasksModal() {
  const taskSchema = z.object({
    taskName: z.string().min(1, 'O nome da tarefa é obrigatório'),
    projectName: z.string().min(1, 'Selecione um projeto'),
    startDate: z.string().min(1, 'Selecione uma data inicial'),
    endDate: z.string().min(1, 'Selecione uma data de entrega'),
    description: z.string().min(1, 'A descrição da tarefa é obrigatória'),
  })

  type Form = z.infer<typeof taskSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(taskSchema),
  })

  const creatTask = () => {}

  const onSubmit = async (data) => {
    await creatTask(data)
    console.log(data)
    reset()
  }

  const options = [
    {
      label: 'Projeto 001',
    },
    {
      label: 'Projeto 002',
    },
    {
      label: 'Projeto 003',
    },
    {
      label: 'Projeto 004',
    },
    {
      label: 'Projeto 005',
    },
  ]

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

        <form
          className="overflow-y-auto overflow-x-hidden max-h-[468px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3 px-1 py-2 ">
            <div className="flex flex-col gap-1">
              <Label>Nome da tarefa</Label>
              <Input.Root className="rounded">
                <Input.Input
                  type="text"
                  placeholder="Digite o nome da sua tarefa"
                  {...register('taskName')}
                />
              </Input.Root>
              {errors.taskName && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.taskName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Projeto</Label>
              <SelectProvider searchable>
                <SelectRoot>
                  <SelectTrigger />
                  <SelectContent>
                    <SelectInput placeholder="Buscar projetos" />
                    {options.map((option) => (
                      <SelectOption key={option.label} option={option.label} />
                    ))}
                  </SelectContent>
                </SelectRoot>
              </SelectProvider>
              {errors.projectName && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.projectName.message}
                </span>
              )}
            </div>
            <div className="flex gap-2 justify-between w-full">
              <div className="flex flex-col gap-1">
                <Label>Data inicial</Label>
                <Input.Root className="rounded">
                  <Input.Input
                    type="date"
                    placeholder="Selecione a data de início"
                    {...register('startDate')}
                  />
                </Input.Root>

                {errors.startDate && (
                  <span className="text-red-500 text-sm font-normal">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Data de entrega</Label>
                <Input.Root className="rounded">
                  <Input.Input
                    type="date"
                    placeholder="Selecione a data de entrega"
                    {...register('endDate')}
                  />
                </Input.Root>

                {errors.endDate && (
                  <span className="text-red-500 text-sm font-normal">
                    {errors.endDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Descrição da tarefa</Label>
              <TextArea
                placeholder="Descreva a sua tarefa"
                {...register('description')}
              />

              {errors.description && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.description.message}
                </span>
              )}
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
