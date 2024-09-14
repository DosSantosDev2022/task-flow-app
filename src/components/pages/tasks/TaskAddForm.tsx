'use client'
import { PiPlus } from 'react-icons/pi'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { Input } from '@/components/global/Form/input'
import { Label } from '@/components/global/Form/label'
import { Button } from '@/components/global/button'
import TextArea from '@/components/global/Form/textArea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTaskSchema, TaskFormData } from '@/@types/schemas/FormSchemaTasks'
import { addNewTaskAction } from '@/app/actions/tasks/addNewTask'
import { useNotification } from '@/contexts/NotificationContext'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Task } from '@prisma/client'

interface TaskAddFormProps {
  projectId: string
  onAddTask: (task: Task) => void // Adiciona a prop onAddTask
}

export function TaskAddForm({ projectId, onAddTask }: TaskAddFormProps) {
  const { data } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { showNotification } = useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(FormTaskSchema),
  })

  const onSubmitAction: SubmitHandler<TaskFormData> = async (formData) => {
    try {
      setIsLoading(true)
      const newTask = await addNewTaskAction({ ...formData, projectId }) // server action
      console.log(newTask)
      if (newTask) {
        onAddTask(newTask)
      } else {
        throw new Error('A terefa criada é indefinida')
      }

      setIsOpenModal(false)
      showNotification('Tarefa cadastrada com sucesso!', 'success', 5000)
    } catch (error) {
      console.error('Erro ao criar projtarefa, verifique :', error)
      setIsOpenModal(false)
      showNotification('Erro ao cadastrar tarefa, verifique!', 'error', 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
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
          onSubmit={handleSubmit(onSubmitAction)}
          className="overflow-y-auto overflow-x-hidden max-h-[468px]"
        >
          <input
            {...register('userId')}
            value={data?.user.id}
            className="hidden"
          />
          <input
            {...register('projectId')}
            value={projectId}
            className="hidden"
          />
          <div className="flex flex-col gap-3 px-1 py-2 ">
            <div className="flex flex-col gap-1">
              <Label>Nome da tarefa</Label>
              <Input.Root className="rounded">
                <Input.Input
                  type="text"
                  placeholder="Digite o nome da sua tarefa"
                  {...register('title')}
                />
              </Input.Root>
              {errors.title && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.title.message}
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
              <Button
                isLoading={isLoading}
                variant="highlight"
                sizes="full"
                className="text-base flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
