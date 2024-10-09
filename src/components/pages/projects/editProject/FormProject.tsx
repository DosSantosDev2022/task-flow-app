'use client'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import {
  FormDataProject,
  FormSchema,
} from '@/@types/ZodSchemas/FormSchemaProject'
import { updateProjectAction } from '@/app/actions/project/update'
import { LuCalendarDays } from 'react-icons/lu'
import { format } from 'date-fns'
import { useNotification } from '@/contexts/NotificationContext'
import { getFixedData } from '@/utils/getFixedDataProjects'
import { useSession } from 'next-auth/react'
import { Typograph } from '@/components/global/typograph '
import { useFetchClient } from '@/hooks/useFetchClient/useFetchClient'
import { ProjectData } from '@/@types/project'

// Lazy load do React Quill para evitar problemas de SSR (Server Side Rendering)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface ProjectEditModalProps {
  project: ProjectData
  closeModal: () => void
}

export function FormProject({ project, closeModal }: ProjectEditModalProps) {
  const { data: session } = useSession()
  const { payments, priorities } = getFixedData()
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { clientOptions } = useFetchClient({ session })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: project.title || '',
      description: project.description || '',
      price: project.price.toString(),
      priority: project.priority || '',
      payment: project.payment || '',
      status: project.status || '',
      startDate: project.startDate.toString() || '',
      endDate: project.endDate.toString() || '',
      client: {
        name: project?.client?.name,
      },
    },
  })

  const onSubmit: SubmitHandler<FormDataProject> = async (formData) => {
    try {
      setIsLoading(true)

      await updateProjectAction(formData)

      closeModal()
      showNotification('Projeto alterado com sucesso !', 'success')
    } catch (error) {
      console.error('Erro ao atualizar o projeto:', error)
      showNotification('Erro ao alterar projeto', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // Impede o comportamento de submit
    setIsEditing(true)
  }

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // Impede o comportamento de submit
    setIsEditing(false)
  }

  return (
    <>
      <h4 className="mb-4 text-xl font-semibold text-zinc-900">
        Detalhes do Projeto
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Nome do Projeto</span>
              <p className="mt-1">{project.title}</p>
            </>
          ) : (
            <FormField
              label="Nome do projeto"
              type="text"
              placeholder="Digite o nome do seu projeto"
              register={register('title')}
              error={errors.title}
              disabled={!isEditing}
            />
          )}
        </div>

        <div className="flex w-full items-center justify-between gap-2 px-1 py-2 border rounded-md ">
          {!isEditing ? (
            <>
              <div>
                <span className="font-bold text-lg">Data início</span>
                <p className="mt-1 flex gap-1 items-center justify-start">
                  <LuCalendarDays />
                  {format(new Date(project.startDate || ''), 'dd/MM/yyyy')}
                </p>
              </div>
              <div>
                <span className="font-bold text-lg">Data entrega</span>
                <p className="mt-1 flex gap-1 items-center justify-start">
                  <LuCalendarDays />
                  {format(new Date(project.endDate || ''), 'dd/MM/yyyy')}
                </p>
              </div>
            </>
          ) : (
            <>
              <FormDatePicker
                name="startDate"
                control={control}
                label="Data de Início"
                error={errors.startDate?.message}
                disabled={!isEditing}
              />
              <FormDatePicker
                name="endDate"
                control={control}
                label="Data de Término"
                error={errors.endDate?.message}
                disabled={!isEditing}
              />
            </>
          )}
        </div>

        <div className="space-y-3 max-h-[220px] overflow-auto px-1 py-2 border rounded-md scrollbar-thin">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Descrição</span>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: project.description || '',
                }}
              />
            </>
          ) : (
            <ReactQuill
              value={project.description || ''}
              onChange={(value) => setValue('description', value)}
              readOnly={!isEditing}
            />
          )}
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 px-1 py-2 border rounded-md">
          <div>
            {!isEditing ? (
              <>
                <span className="font-bold text-lg">Preço</span>
                <p className="mt-1">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(project.price))}
                </p>
              </>
            ) : (
              <FormField
                label="Preço"
                type="number"
                placeholder="R$: 0,00"
                register={register('price')}
                error={errors.price}
                disabled={!isEditing}
              />
            )}
          </div>

          <div className="px-1 py-2 border rounded-md">
            {!isEditing ? (
              <>
                <span className="font-bold text-lg">Pagamento</span>
                <Typograph className="mt-1">{project?.payment}</Typograph>
              </>
            ) : (
              <SelectField
                label="Pagamento"
                options={payments}
                name="payment"
                control={control}
                error={errors.payment}
                disabled={!isEditing}
              />
            )}
          </div>
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Cliente</span>
              <p>{project.client?.name}</p>
            </>
          ) : (
            <SelectField
              label="Cliente"
              options={clientOptions}
              name="clientId"
              control={control}
              error={errors.clientId}
              disabled={!isEditing}
            />
          )}
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Prioridade</span>
              <p className="mt-1">{project.priority}</p>
            </>
          ) : (
            <SelectField
              label="Prioridade"
              options={priorities}
              name="priority"
              control={control}
              error={errors.priority}
              disabled={!isEditing}
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          {!isEditing ? (
            <>
              <Button
                type="button" // Alterado para "button" para não submeter o formulário
                onClick={handleEditClick} // Função que define o estado de edição
                variant="highlight"
                sizes="full"
              >
                Editar
              </Button>
              <Button
                type="button"
                onClick={closeModal}
                variant="outline"
                sizes="full"
              >
                Fechar
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={isLoading}
                type="submit"
                isLoading={isLoading}
                variant="highlight"
                sizes="full"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
              <Button
                type="button" // Alterado para "button" para não submeter o formulário
                onClick={handleCancelClick} // Função que define o estado de edição
                variant="outline"
                sizes="full"
              >
                Cancelar
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  )
}
