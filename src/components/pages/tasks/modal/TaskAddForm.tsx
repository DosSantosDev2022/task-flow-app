'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { Button } from '@/components/global/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormTaskSchema,
  TaskFormData,
} from '@/@types/FormSchemas/FormSchemaTasks'
import { addNewTaskAction } from '@/app/actions/tasks/addNewTask'
import { useNotification } from '@/contexts/NotificationContext'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Task } from '@prisma/client'
import { FormField } from '@/components/global/Form/FormField'
import { TextAreaField } from '@/components/global/Form/TextAreaField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import { FaCirclePlus } from 'react-icons/fa6'

interface TaskAddFormProps {
  projectId: string
  onAddTask: (task: Task) => void // Adiciona a prop onAddTask
  disable?: boolean
}

export function TaskAddForm({
  projectId,
  onAddTask,
  disable = false,
}: TaskAddFormProps) {
  const { data } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { showNotification } = useNotification()
  const {
    setValue,
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(FormTaskSchema),
  })

  useEffect(() => {
    if (data) {
      const session = data.user
      setValue('userId', session.id)
    }
    setValue('projectId', projectId)
  }, [setValue, data, projectId])

  const onSubmitAction: SubmitHandler<TaskFormData> = async (formData) => {
    try {
      setIsLoading(true)
      const newTask = await addNewTaskAction({ ...formData, projectId }) // server action

      if (newTask) {
        onAddTask(newTask)
        reset()
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
      <DialogTrigger className="bg-violet-600 w-[72px] lg:w-[98px] h-10 rounded-2xl px-2 py-4 active:scale-95 duration-300 text-zinc-50 justify-center  flex gap-1 items-center">
        <FaCirclePlus size={16} />
        <span className="text-base">Nova</span>
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
          <div className="flex flex-col gap-3 px-1 py-2 ">
            <FormField
              label="Nome da tarefa"
              register={register('title')}
              placeholder="Digite o nome da sua tarefa"
              disabled={disable}
              error={errors.title}
              type="text"
            />

            <div className="flex gap-2 justify-between w-full">
              <FormDatePicker
                control={control}
                label="Data de início"
                name="startDate"
                disabled={disable}
                error={errors.startDate?.message}
              />

              <FormDatePicker
                control={control}
                label="Data de entrega"
                name="endDate"
                disabled={disable}
                error={errors.endDate?.message}
              />
            </div>

            <TextAreaField
              label="Descrição"
              register={register('description')}
              disabled={disable}
              placeholder="Descreva o seu projeto"
              error={errors.description}
            />

            <Button
              isLoading={isLoading}
              variant="highlight"
              sizes="full"
              className="text-base flex items-center justify-center space-x-3"
              disabled={isLoading}
            >
              {isLoading ? 'Adicionando' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
