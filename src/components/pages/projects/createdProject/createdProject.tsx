'use client'
import { Button } from '@/components/global/button'
import { Input } from '@/components/global/input'
import { Label } from '@/components/global/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import TextArea from '@/components/global/textArea'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useSession } from 'next-auth/react'

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

const FormSchema = z.object({
  title: z.string().min(1, 'O nome do projeto é obrigatório'),
  description: z.string().min(1, 'A descrição do projeto é obrigatória'),
  startDate: z.string(),
  endDate: z.string(),
  price: z.string().min(1, 'O preço é obrigatório'),
  payment: z.string(),
})

type Form = z.infer<typeof FormSchema>

export function CreatedProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })
  const { data } = useSession()
  const token = data

  /* if (!session) {
    throw new Error('Você precisa estar logado para fazer essa requisição')
  } */

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response = await fetch(`/api/project/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token?.user.id}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.log(response)
        throw new Error(error.error || 'Erro ao criar projeto')
      }

      alert('Projeto criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar projeto, verifique:', error)
      alert('Erro ao criar projeto')
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button sizes="xs" variant="highlight" className="w-[112px] ">
            Novo Projeto +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Vamos criar um novo projeto</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

            <Button variant="highlight" sizes="full" className="text-base">
              Criar projeto
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
