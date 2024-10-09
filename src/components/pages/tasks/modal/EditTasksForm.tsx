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
} from '@/@types/ZodSchemas/FormSchemaTasks'
import { useNotification } from '@/contexts/NotificationContext'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Task } from '@prisma/client'
import { FormField } from '@/components/global/Form/FormField'
import { TextAreaField } from '@/components/global/Form/TextAreaField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import { useTaskStore } from '@/store/TaskStore'

interface TaskAddFormProps {
  task?: Task // Prop opcional para editar tarefa
}

export function ModalTasksForm({ task }: TaskAddFormProps) {
  const { data } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { showNotification } = useNotification()
  const { updateTask } = useTaskStore() // Usando o estado global das tarefas
  const {
    reset,
    setValue,
    register,
    control,
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
    setValue('projectId', task?.projectId || '')
    setValue('status', task?.status || 'A_FAZER')
  }, [setValue, data, task])

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        startDate: task.startDate.toString() || '',
        endDate: task.endDate.toString() || '',
        projectId: task.projectId,
        userId: task.userId,
      })
      setIsEditing(false) // Começa desabilitado
    }
  }, [task, reset])

  const onSubmitAction: SubmitHandler<TaskFormData> = async (formData) => {
    try {
      setIsLoading(true)

      const updatedTask = {
        id: task?.id || '',
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        projectId: formData.projectId,
        userId: formData.userId,
        status: task?.status || 'A_FAZER',
      }

      // Atualiza a task no estado global (Zustand) e no localStorage
      updateTask(task?.id || '', updatedTask)

      showNotification('Tarefa atualizada com sucesso!', 'success', 5000)
      setIsOpenModal(false)
    } catch (error) {
      console.error('Erro ao atualizar tarefa, verifique:', error)
      showNotification('Erro ao atualizar tarefa, verifique!', 'error', 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger sizes="full" effects="scale" variant="outline">
        <span className="text-base">
          {isEditing ? 'Editar tarefa' : 'Abrir tarefa'}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-600">
            {task ? 'Editar tarefa' : 'Adicione uma nova tarefa'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmitAction)}
          className="overflow-y-auto overflow-x-hidden max-h-[468px]"
        >
          <div className="flex flex-col gap-3 px-1 py-2">
            <FormField
              label="Nome da tarefa"
              register={register('title')}
              placeholder="Digite o nome da sua tarefa"
              disabled={!isEditing}
              error={errors.title}
              type="text"
            />

            <div className="flex gap-2 justify-between w-full">
              <FormDatePicker
                control={control}
                label="Data de início"
                name="startDate"
                disabled={!isEditing}
                error={errors.startDate?.message}
              />

              <FormDatePicker
                control={control}
                label="Data de entrega"
                name="endDate"
                disabled={!isEditing}
                error={errors.endDate?.message}
              />
            </div>

            <TextAreaField
              label="Descrição"
              register={register('description')}
              disabled={!isEditing}
              placeholder="Descreva a sua tarefa"
              error={errors.description}
            />
            <Button
              isLoading={isLoading}
              variant="highlight"
              sizes="full"
              className="text-base flex items-center justify-center space-x-3"
              disabled={isLoading}
              type="button" // Mantém como botão normal
              onClick={() => {
                if (isEditing) {
                  handleSubmit(onSubmitAction)() // Chama a função de submissão
                } else {
                  setIsEditing(true) // Habilita a edição se não estiver editando
                }
              }}
            >
              {isEditing ? 'Salvar' : 'Editar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
