'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useNotification } from '@/contexts/NotificationContext'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { createProjectAction } from '@/app/actions/project/create'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { TextAreaField } from '@/components/global/Form/TextAreaField'

// Dados fixos
const payments = [
  {
    value: 'DINHEIRO',
    label: 'Dinheiro',
  },
  {
    value: 'CREDITO',
    label: 'Crédito',
  },
  {
    value: 'DEBITO',
    label: 'Débito',
  },
  {
    value: 'PIX',
    label: 'Pix',
  },
]
const priorities = [
  {
    value: 'ALTA',
    label: 'Alta ',
  },
  {
    value: 'MEDIA',
    label: 'Média',
  },
  {
    value: 'BAIXA',
    label: 'Baixa',
  },
]
const clients = [
  { label: 'Juliano Santos', value: '740ea0fe-5db2-4e43-b4c5-d5a878a3fe66' },
  { label: 'Amanda Oliveira', value: 'f46bfc07-0c1b-4676-8100-8d8b79f24ab6' },
]

interface ProjectCreationFormProps {
  closeModal: () => void
}

export function ProjectCreationForm({ closeModal }: ProjectCreationFormProps) {
  const {
    setValue,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()
  const { data } = useSession()
  const session = data
  console.log(setIsLoading)
  const values = getValues() // Exibe todos os valores do formulário
  console.log(values)
  console.log('erros', errors)
  useEffect(() => {
    if (session) {
      setValue('userId', session.user.id)
      setValue('status', 'PENDENTES')
    }
  }, [session, setValue])

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
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-3">
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

      <div className="flex w-full items-center justify-between gap-2">
        <FormField
          label="Data de início"
          type="date"
          register={register('startDate')}
          error={errors.startDate}
        />

        <FormField
          label="Data de entrega"
          type="date"
          register={register('endDate')}
          error={errors.endDate}
        />

        <FormField
          label="Preço"
          type="number"
          placeholder="R$: 0,00"
          register={register('price')}
          error={errors.price}
        />
      </div>

      <SelectField
        label="Forma de pagamento"
        options={payments}
        register={register('payment')}
        error={errors.payment}
      />

      <SelectField
        label="Cliente"
        options={clients}
        register={register('clientId')}
        error={errors.clientId}
      />

      <SelectField
        label="Prioridades"
        options={priorities}
        register={register('priority')}
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
