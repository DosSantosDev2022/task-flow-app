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
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
  nome: z.string().min(1, 'O nome do projeto é obrigatório'),
  email: z.string().email('O email deve ser válido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  project: z.string().optional(),
})

type Form = z.infer<typeof FormSchema>

export function CreatedClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response = await fetch('/api/client/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Remova {data} e use apenas data
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao criar novo cliente')
      }

      alert('Cliente cadastrado com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar cliente, verifique:', error)
      alert('Erro ao cadastrar cliente')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button sizes="xs" variant="highlight">
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Cadastre o seu novo cliente</DialogTitle>
          <DialogDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-1">
            <Label className="">Nome do cliente</Label>
            <Input.Root>
              <Input.Input
                className="text-sm"
                type="text"
                placeholder="Nome completo"
                {...register('nome')}
              />
            </Input.Root>
            {errors.nome && (
              <span className="text-red-800">{errors.nome.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="">E-mail</Label>
            <Input.Root>
              <Input.Input
                className="text-sm"
                type="email"
                placeholder="cliente@email.com"
                {...register('email')}
              />
            </Input.Root>
            {errors.nome && (
              <span className="text-red-800">{errors.email?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="">Telefone</Label>
            <Input.Root>
              <Input.Input
                className="text-sm"
                type="tel"
                placeholder="(xx) xxxx-xxxx"
                {...register('phone')}
              />
            </Input.Root>
            {errors.nome && (
              <span className="text-red-800">{errors.email?.message}</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <Label className="">CEP</Label>
              <Input.Root>
                <Input.Input
                  className="text-sm"
                  type="text"
                  placeholder="Digite o cep"
                  {...register('postalCode')}
                />
              </Input.Root>
              {errors.nome && (
                <span className="text-red-800">
                  {errors.postalCode?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="">Enderço</Label>
              <Input.Root>
                <Input.Input
                  className="text-sm"
                  type="text"
                  placeholder="Digite o endereço completo"
                  {...register('address')}
                />
              </Input.Root>
              {errors.nome && (
                <span className="text-red-800">{errors.email?.message}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1 w-full">
              <Label className="">País</Label>
              <select
                {...register('country')}
                className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Selecione o país</option>
                {payments.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.nome && (
                <span className="text-red-800">{errors.country?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="">Cidade</Label>
              <select
                {...register('city')}
                className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Selecione a cidade</option>
                {payments.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.nome && (
                <span className="text-red-800">{errors.city?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="">Estado</Label>
              <select
                {...register('state')}
                className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Selecione o estado</option>
                {payments.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.nome && (
                <span className="text-red-800">{errors.state?.message}</span>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label className="">Projetos</Label>
            <select
              {...register('project')}
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="">Selecione um projeto</option>
              {payments.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.nome && (
              <span className="text-red-800">{errors.project?.message}</span>
            )}
          </div>

          <Button variant="highlight" sizes="full" className="text-base">
            Cadastrar cliente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
