'use client'

import { Button } from '@/components/global/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormDataClient,
  FormSchema,
} from '@/@types/ZodSchemas/FormSchemaClients'
import { createClientAction } from '@/app/actions/client/create'
import { useNotification } from '@/contexts/NotificationContext'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { useGetStates } from '@/hooks/useGetStates/useGetStates'
import { useGetCities } from '@/hooks/useGetCities/useGetCities'
import { useState } from 'react'

interface ClientFormProps {
  closeModal: () => void
}

const countrys = [
  {
    label: 'Brasil',
    value: 'BRASIL',
  },
  {
    label: 'EUA',
    value: 'EUA',
  },
  {
    label: 'Argentina',
    value: 'ARGENTINA',
  },
]

export function ClientForm({ closeModal }: ClientFormProps) {
  const { showNotification } = useNotification()
  const { states, isLoading: isLoadingStates } = useGetStates()
  const [selectedState, setSelectedState] = useState('')
  const { cities, isLoading: isLoadingCities } = useGetCities({
    uf: selectedState,
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataClient>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<FormDataClient> = async (formData) => {
    try {
      await createClientAction(formData)

      closeModal()
      showNotification('Cliente cadastrado com sucesso', 'success')
    } catch (error) {
      console.error('Erro ao cadastrar cliente, verifique:', error)
      showNotification('Erro ao cadastrar cliente', 'error')
    }
  }

  const handleStateChange = (value: string) => {
    setSelectedState(value)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          label="Nome completo"
          register={register('name')}
          placeholder="Nome completo"
          type=""
          error={errors.name}
        />
        <FormField
          label="E-mail"
          register={register('email')}
          placeholder="email@exemplo"
          type=""
          error={errors.email}
        />
        <FormField
          label="Telefone"
          register={register('phone')}
          placeholder="(xx) xxxx-xxxx"
          type=""
          error={errors.phone}
        />

        <div className="flex items-center justify-between w-full gap-2">
          <FormField
            label="Endereço"
            register={register('address')}
            placeholder="XXXXXXXXXXXXXXXX"
            type=""
            error={errors.address}
          />

          <FormField
            label="CEP"
            register={register('postalCode')}
            placeholder="XXXXXX-XXXXXX"
            type=""
            error={errors.postalCode}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <SelectField
            label="País"
            options={countrys}
            name="country"
            control={control}
            error={errors.country}
          />

          <SelectField
            label="Estados"
            options={
              isLoadingStates
                ? [{ label: 'Carregando...', value: 'Carregando...' }]
                : states
            }
            control={control}
            name="state"
            error={errors.state}
            onValueChange={handleStateChange}
          />

          <SelectField
            label="Cidade"
            options={cities}
            placeholder={isLoadingCities ? 'Carregando...' : 'Selecione'}
            control={control}
            name="city"
            error={errors.city}
            disabled={!selectedState || isLoadingCities}
          />
        </div>

        <Button variant="highlight" sizes="full" className="text-base">
          Cadastrar cliente
        </Button>
      </form>
    </>
  )
}
