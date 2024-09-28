'use client'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import { GetProjectById } from '@/app/actions/project/getById'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { updateProjectAction } from '@/app/actions/project/update'
import { Typograph } from '@/components/global/typograph'
import { LuCalendarDays } from 'react-icons/lu'
import { format } from 'date-fns'
import { FaSpinner } from 'react-icons/fa'
import { useNotification } from '@/contexts/NotificationContext'

// Lazy load do React Quill para evitar problemas de SSR (Server Side Rendering)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Dados fixos (pode ser substituído por dados dinâmicos)
const payments = [
  { value: 'DINHEIRO', label: 'Dinheiro' },
  { value: 'CREDITO', label: 'Crédito' },
  { value: 'DEBITO', label: 'Débito' },
  { value: 'PIX', label: 'Pix' },
]
const priorities = [
  { value: 'ALTA', label: 'Alta' },
  { value: 'MEDIA', label: 'Média' },
  { value: 'BAIXA', label: 'Baixa' },
]
const clients = [
  { label: 'Juliano Santos', value: '740ea0fe-5db2-4e43-b4c5-d5a878a3fe66' },
  { label: 'Amanda Oliveira', value: 'f46bfc07-0c1b-4676-8100-8d8b79f24ab6' },
]

interface ProjectEditModalProps {
  projectId: string
  closeModal: () => void
}

export function FormEditProject({
  projectId,
  closeModal,
}: ProjectEditModalProps) {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [initialData, setInitialData] = useState<FormDataProject>({
    id: '',
    title: '',
    description: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    price: '0',
    payment: 'DINHEIRO',
    clientId: '',
    priority: 'MEDIA',
    status: 'TODOS',
    userId: '',
  })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true)
        const data = await GetProjectById(projectId)
        if (data) {
          const formattedData: FormDataProject = {
            id: data.id,
            title: data.title || '',
            description: data.description || '',
            startDate: data.startDate
              ? format(new Date(data.startDate), 'yyyy/MM/dd')
              : '',
            endDate: data.endDate
              ? format(new Date(data.endDate), 'yyyy/MM/dd')
              : '',
            price: data.price?.toString() || '',
            payment: data.payment || 'DINHEIRO',
            status: data.status || 'PENDENTES',
            userId: data.userId || '',
            clientId: data.clientId || '',
            priority: data.priority || 'BAIXA',
          }
          setInitialData(formattedData)
          for (const key in formattedData) {
            setValue(
              key as keyof FormDataProject,
              formattedData[key as keyof FormDataProject],
            )
          }
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do projeto:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId, setValue])

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
    <div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <FaSpinner size={32} className="animate-spin text-violet-700" />
        </div>
      ) : (
        <>
          <Typograph as={'h4'} className="mb-4">
            Detalhes do Projeto
          </Typograph>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="px-1 py-2 border rounded-md">
              {!isEditing ? (
                <>
                  <Typograph as={'span'} className="font-bold text-lg">
                    Nome do Projeto
                  </Typograph>
                  <Typograph className="mt-1" as={'p'}>
                    {initialData.title}
                  </Typograph>
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
                    <Typograph as={'span'} className="font-bold text-lg">
                      Data início
                    </Typograph>
                    <Typograph className="mt-1 flex gap-1 items-center justify-start">
                      <LuCalendarDays />
                      {format(new Date(initialData.startDate), 'dd/MM/yyyy')}
                    </Typograph>
                  </div>
                  <div>
                    <Typograph as={'span'} className="font-bold text-lg">
                      Data entrega
                    </Typograph>
                    <Typograph className="mt-1 flex gap-1 items-center justify-start">
                      <LuCalendarDays />
                      {format(new Date(initialData.endDate), 'dd/MM/yyyy')}
                    </Typograph>
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
                  <Typograph as={'span'} className="font-bold text-lg">
                    Descrição
                  </Typograph>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: initialData.description,
                    }}
                  />
                </>
              ) : (
                <ReactQuill
                  value={initialData.description}
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
                    <Typograph as={'span'} className="font-bold text-lg">
                      Preço
                    </Typograph>
                    <Typograph className="mt-1">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(Number(initialData.price))}
                    </Typograph>
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
                    <Typograph as={'span'} className="font-bold text-lg">
                      Pagamento
                    </Typograph>
                    <Typograph className="mt-1">
                      {initialData.payment}
                    </Typograph>
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
                  <Typograph as={'span'} className="font-bold text-lg">
                    Cliente
                  </Typograph>
                  <p>{}</p>
                </>
              ) : (
                <SelectField
                  label="Cliente"
                  options={clients}
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
                  <Typograph as={'span'} className="font-bold text-lg">
                    Prioridade
                  </Typograph>
                  <Typograph className="mt-1">{initialData.priority}</Typograph>
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
      )}
    </div>
  )
}
