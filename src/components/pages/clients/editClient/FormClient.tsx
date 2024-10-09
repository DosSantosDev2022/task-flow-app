'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/global/button'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import {
  FormSchema,
  FormDataClient,
} from '@/@types/ZodSchemas/FormSchemaClients'
import { useNotification } from '@/contexts/NotificationContext'
import { updateClientAction } from '@/app/actions/client/update'
import { ClientData } from '@/utils/getClients'

const cities = [
  {
    label: 'São Paulo',
    value: 'SÃO PAULO',
  },
  {
    label: 'Jundiaí',
    value: 'JUNDIAÍ',
  },
  {
    label: 'Itupeva',
    value: 'ITUPEVA',
  },
  {
    label: 'Sorocaba',
    value: 'SOROCABA',
  },
]
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
const states = [
  {
    label: 'SP',
    value: 'SP',
  },
  {
    label: 'MG',
    value: 'MG',
  },
  {
    label: 'TO',
    value: 'TO',
  },
]

interface ClientEditModalProps {
  client: ClientData
  closeModal: () => void
}

export function FormClient({ client, closeModal }: ClientEditModalProps) {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataClient>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: client.name || '',
      email: client.email || '',
      userId: client.userId || '',
      id: client.id,
      phone: client.phone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      postalCode: client.postalCode || '',
      country: client.country || '',
      project: client.Project || {},
    },
  })

  const onSubmit: SubmitHandler<FormDataClient> = async (formData) => {
    try {
      setIsLoading(true)

      await updateClientAction(formData)

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
        Detalhes do Cliente
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Nome do cliente</span>
              <p className="mt-1">{client?.name}</p>
            </>
          ) : (
            <FormField
              label="Nome completo"
              register={register('name')}
              placeholder="Nome completo"
              type=""
              error={errors.name}
            />
          )}
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">E-mail</span>
              <p className="mt-1">{client?.email}</p>
            </>
          ) : (
            <FormField
              label="E-mail"
              register={register('email')}
              placeholder="email@exemplo"
              type=""
              error={errors.email}
            />
          )}
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Telefone</span>
              <p className="mt-1">{client?.phone}</p>
            </>
          ) : (
            <FormField
              label="Telefone"
              register={register('phone')}
              placeholder="(xx) xxxx-xxxx"
              type=""
              error={errors.phone}
            />
          )}
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">Endereço</span>
              <p className="mt-1">{client?.address}</p>

              <span className="font-bold text-lg">CEP</span>
              <p className="mt-1">{client?.postalCode}</p>
            </>
          ) : (
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
          )}
        </div>

        <div className="px-1 py-2 border rounded-md">
          {!isEditing ? (
            <>
              <span className="font-bold text-lg">País</span>
              <p className="mt-1">{client?.country}</p>

              <span className="font-bold text-lg">Estado</span>
              <p className="mt-1">{client?.state}</p>

              <span className="font-bold text-lg">Cidade</span>
              <p className="mt-1">{client?.city}</p>
            </>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <SelectField
                label="País"
                options={countrys}
                name="country"
                control={control}
                error={errors.country}
              />

              <SelectField
                label="Cidade"
                options={cities}
                control={control}
                name="city"
                error={errors.city}
              />
              <SelectField
                label="Estados"
                options={states}
                control={control}
                name="state"
                error={errors.state}
              />
            </div>
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
