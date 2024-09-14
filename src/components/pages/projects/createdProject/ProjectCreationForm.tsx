'use client'
import { Button } from '@/components/global/button'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import TextArea from '@/components/global/textArea'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { BiX } from 'react-icons/bi'
import { createProjectAction } from '@/app/actions/project/create'
import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { useState } from 'react'
import { useNotification } from '@/contexts/NotificationContext'

const payments = [
  {
    label: 'DINHEIRO',
  },
  {
    label: 'CREDITO',
  },
  {
    label: 'DEBITO',
  },
  {
    label: 'PIX',
  },
]

const priority = [
  {
    label: 'BAIXA',
  },
  {
    label: 'MEDIA',
  },
  {
    label: 'ALTA',
  },
]

const clients = [
  {
    label: 'Juliano Santos',
    id: '740ea0fe-5db2-4e43-b4c5-d5a878a3fe66',
  },
  {
    label: 'Amanda Oliveira',
    id: 'f46bfc07-0c1b-4676-8100-8d8b79f24ab6',
  },
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

  /* if (!session) {
    router.push('/signIn')
    return null
  } */

  const onSubmitAction: SubmitHandler<FormDataProject> = async (formData) => {
    try {
      setIsLoading(true)
      await createProjectAction(formData) // server action para criar um novo projeto no banco de dados

      setIsOpenModal(false)
      showNotification('Projeto cadastrado com sucesso!', 'success', 5000)
    } catch (error) {
      console.error('Erro ao criar projeto, verifique :', error)
      setIsOpenModal(false)
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between ">
              <DialogTitle>Vamos criar um novo projeto</DialogTitle>
              <DialogClose className="rounded-md bg-zinc-200 border hover:opacity-80 active:scale-75 duration-300">
                <BiX size={25} />
              </DialogClose>
            </div>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          <form
            /* action={onSubmitAction} */
            onSubmit={handleSubmit(onSubmitAction)}
            className="space-y-3"
          >
            <input
              {...register('userId')}
              value={session?.user.id}
              className="hidden"
            />
            <input
              {...register('status')}
              value={'PENDENTES'}
              className="hidden"
            />
            <div className="flex flex-col gap-1">
              <Label className="">Nome do projeto</Label>
              <Input.Root>
                <Input.Input
                  className="text-sm"
                  type="text"
                  placeholder="Digite o nome do seu projeto"
                  {...register('title')}
                />
              </Input.Root>
              {errors && (
                <span className="text-red-800">{errors.title?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="">Descreva o seu projeto</Label>
              <TextArea
                className="text-sm"
                placeholder="Crie uma descrição completa para seu projeto."
                {...register('description')}
              />
              {errors && (
                <span className="text-red-800">
                  {errors.description?.message}
                </span>
              )}
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label className="">Data de início</Label>
                <Input.Root>
                  <Input.Input
                    className="text-sm w-full"
                    type="date"
                    {...register('startDate')}
                  />
                </Input.Root>
                {errors && (
                  <span className="text-red-800">
                    {errors.startDate?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="">Data de entrega</Label>
                <Input.Root>
                  <Input.Input
                    className="text-sm w-full"
                    type="date"
                    {...register('endDate')}
                  />
                </Input.Root>
                {errors && (
                  <span className="text-red-800">
                    {errors.endDate?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <Label className="">Preço</Label>
                <Input.Root>
                  <Input.Input
                    className="text-sm"
                    type="number"
                    placeholder="R$: 0,00"
                    {...register('price')}
                  />
                </Input.Root>
                {errors && (
                  <span className="text-red-800">{errors.price?.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="">Forma de pagamento</Label>

                <div className="w-full mx-auto">
                  <select
                    {...register('payment')}
                    className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected> Selecione</option>
                    {payments.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {errors && (
                  <span className="text-red-800">
                    {errors.payment?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Cliente</Label>
              <div className="w-full mx-auto">
                <select
                  {...register('clientId')}
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option selected>Selecione</option>
                  {clients.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors && (
                <span className="text-red-800">{errors.clientId?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="">Prioriades</Label>

              <div className="w-full mx-auto">
                <select
                  {...register('priority')}
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected> Selecione</option>
                  {priority.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {errors && (
                <span className="text-red-800">{errors.priority?.message}</span>
              )}
            </div>
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
