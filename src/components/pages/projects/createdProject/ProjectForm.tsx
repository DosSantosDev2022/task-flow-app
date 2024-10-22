'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNotification } from '@/contexts/NotificationContext'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { createProjectAction } from '@/app/actions/project/create'
import {
  FormDataProject,
  FormSchema,
} from '@/@types/ZodSchemas/FormSchemaProject'
import { TextAreaField } from '@/components/global/Form/TextAreaField'
import { FormDatePicker } from '@/components/global/Form/FormDataPicker'
import { getFixedData } from '@/utils/getFixedDataProjects'
import { useGetClients } from '@/hooks/fetchClient/useGetClients'

interface ProjectCreationFormProps {
  closeModal: () => void
}

export function ProjectCreationForm({ closeModal }: ProjectCreationFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const { clientOptions } = useGetClients()
  const { payments, priorities } = getFixedData()
  const { showNotification } = useNotification()

  const onSubmitAction: SubmitHandler<FormDataProject> = async (formData) => {
    try {
      setIsLoading(true)
      await createProjectAction(formData)
      closeModal()
      showNotification('Projeto cadastrado com sucesso!', 'success', 5000)
    } catch (error) {
      console.error('Erro ao criar projeto, verifique :', error)
      showNotification('Erro ao cadastrar projeto, verifique!', 'error', 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <FormField
        label="Nome do projeto"
        type="text"
        placeholder="Digite o nome do seu projeto"
        register={register('title')}
        error={errors.title}
      />

      <TextAreaField
        label="Descreva o seu projeto"
        placeholder="Crie uma descrição completa para seu projeto."
        register={register('description')}
        error={errors.description}
      />

      <div className="flex w-full items-center justify-between gap-2 ">
        <div className="w-full flex items-center space-x-3">
          <FormDatePicker
            name="startDate"
            control={control}
            label="Data de Início"
            error={errors.startDate?.message}
          />

          <FormDatePicker
            name="endDate"
            control={control}
            label="Data de Início"
            error={errors.startDate?.message}
          />
        </div>

        <div className="flex items-center justify-center w-full space-x-3">
          <FormField
            label="Preço"
            type="number"
            placeholder="R$: 0,00"
            register={register('price')}
            error={errors.price}
          />
          <SelectField
            label="Pagamento"
            options={payments}
            control={control}
            name="payment"
            error={errors.payment}
          />
        </div>
      </div>

      <SelectField
        label="Cliente"
        options={clientOptions}
        control={control}
        name="clientId"
        error={errors.clientId}
      />

      <SelectField
        name="priority"
        label="Prioridades"
        options={priorities}
        control={control}
        error={errors.priority}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        variant="highlight"
        sizes="full"
        effects="scale"
        className="text-base flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  )
}
