import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { TextAreaField } from '@/components/global/Form/TextAreaField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import { GetProjectById } from '@/app/actions/project/getById'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { updateProjectAction } from '@/app/actions/project/update'

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
            startDate: data.startDate?.toISOString().split('T')[0] || '',
            endDate: data.endDate?.toISOString().split('T')[0] || '',
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
      // Optionally: show a success notification
    } catch (error) {
      console.error('Erro ao atualizar o projeto:', error)
      // Optionally: show an error notification
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Detalhes do Projeto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Nome do projeto"
          type="text"
          placeholder="Digite o nome do seu projeto"
          register={register('title')}
          error={errors.title}
          disabled={!isEditing}
        />

        <TextAreaField
          label="Descrição do projeto"
          placeholder="Crie uma descrição completa para seu projeto."
          register={register('description')}
          error={errors.description}
          disabled={!isEditing}
        />

        <div className="flex w-full items-center justify-between gap-2">
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
        </div>

        <div className="flex items-center justify-between gap-2">
          <FormField
            label="Preço"
            type="number"
            placeholder="R$: 0,00"
            register={register('price')}
            error={errors.price}
            disabled={!isEditing}
          />
          <SelectField
            label="Forma de pagamento"
            options={payments}
            register={register('payment')}
            error={errors.payment}
            disabled={!isEditing}
          />
        </div>

        <SelectField
          label="Cliente"
          options={clients}
          register={register('clientId')}
          error={errors.clientId}
          disabled={!isEditing}
        />

        <SelectField
          label="Prioridade"
          options={priorities}
          register={register('priority')}
          error={errors.priority}
          disabled={!isEditing}
        />

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
    </div>
  )
}
