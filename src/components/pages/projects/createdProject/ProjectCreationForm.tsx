'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useNotification } from '@/contexts/NotificationContext'
import { Button } from '@/components/global/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { FormField } from '@/components/global/Form/FormField'
import { SelectField } from '@/components/global/Form/SelectField'
import { createProjectAction } from '@/app/actions/project/create'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { BiX } from 'react-icons/bi'
import { TextAreaField } from '@/components/global/Form/TextAreaField'

// Dados fixos
const payments = ['DINHEIRO', 'CREDITO', 'DEBITO', 'PIX']
const priorities = ['BAIXA', 'MEDIA', 'ALTA']
const clients = [
  { label: 'Juliano Santos', id: '740ea0fe-5db2-4e43-b4c5-d5a878a3fe66' },
  { label: 'Amanda Oliveira', id: 'f46bfc07-0c1b-4676-8100-8d8b79f24ab6' },
]

export function ProjectCreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
  })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()
  const { data } = useSession()
  const session = data

  const onSubmitAction: SubmitHandler<FormDataProject> = async (formData) => {
    try {
      setIsLoading(true)
      await createProjectAction(formData)
      setIsOpenModal(false)
      showNotification('Projeto cadastrado com sucesso!', 'success', 5000)
    } catch (error) {
      console.error('Erro ao criar projeto, verifique :', error)
      showNotification('Erro ao cadastrar projeto, verifique!', 'error', 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogTrigger asChild>
          <Button
            effects="scale"
            sizes="xs"
            variant="highlight"
            className="w-[120px]"
          >
            Novo Projeto
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[768px] h-[568px] overflow-auto scrollbar-thin">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Vamos criar um novo projeto</DialogTitle>
              <DialogClose className="rounded-md bg-zinc-200 border hover:opacity-80 active:scale-75 duration-300">
                <BiX size={25} />
              </DialogClose>
            </div>
            <DialogDescription>
              Make changes to your profile here. Click save when you’re done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-3">
            <input
              {...register('userId')}
              value={session?.user.id}
              className="hidden"
            />
            <input
              {...register('status')}
              value="PENDENTES"
              className="hidden"
            />

            <FormField
              label="Nome do projeto"
              type="text"
              placeholder="Digite o nome do seu projeto"
              register={register}
              name="title"
              error={errors.title}
            />

            <TextAreaField
              label="Descreva o seu projeto"
              placeholder="Crie uma descrição completa para seu projeto."
              register={register}
              name="description"
              error={errors.description}
            />

            <div className="flex w-full items-center justify-between gap-2">
              <FormField
                label="Data de início"
                type="date"
                register={register}
                name="startDate"
                error={errors.startDate}
              />

              <FormField
                label="Data de entrega"
                type="date"
                register={register}
                name="endDate"
                error={errors.endDate}
              />

              <FormField
                label="Preço"
                type="number"
                placeholder="R$: 0,00"
                register={register}
                name="price"
                error={errors.price}
              />
            </div>

            <SelectField
              label="Forma de pagamento"
              options={payments}
              register={register}
              name="payment"
              error={errors.payment}
            />

            <SelectField
              label="Cliente"
              options={clients.map((client) => client.label)}
              register={register}
              name="clientId"
              error={errors.clientId}
            />

            <SelectField
              label="Prioridades"
              options={priorities}
              register={register}
              name="priority"
              error={errors.priority}
            />

            <Button
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
        </DialogContent>
      </Dialog>
    </>
  )
}
