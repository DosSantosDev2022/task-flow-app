import { FormDataProject, FormSchema } from '@/@types/schemas/FormSchemaProject'
import { GetProjectById } from '@/app/actions/project/getById'
import { Button } from '@/components/global/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/global/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNotification } from '@/contexts/NotificationContext'
import { updateProjectAction } from '@/app/actions/project/update'
import { useSession } from 'next-auth/react'
import { Label } from '@/components/global/label'

type ProjectType = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  price: string
  payment: 'DINHEIRO' | 'CREDITO' | 'DEBITO' | 'PIX'
  status: 'TODOS' | 'FINALIZADOS' | 'PENDENTES'
  userId: string
  priority: 'BAIXA' | 'MEDIA' | 'ALTA'
}

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

export function EditProjectModal({ projectId }: { projectId: string }) {
  const [projectData, setProjectData] = useState<FormDataProject | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const { showNotification } = useNotification()
  const session = useSession()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProject>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const fetchProjectData = async () => {
      const project = await GetProjectById(projectId)
      if (project) {
        const mappedProject: ProjectType = {
          id: project.id,
          title: project.title || '',
          description: project.description || '',
          startDate: project.startDate
            ? project.startDate.toISOString().split('T')[0]
            : '',
          endDate: project.endDate
            ? project.endDate.toISOString().split('T')[0]
            : '',
          price: project.price.toString(),
          payment: project.payment,
          status: project.status,
          userId: project.userId,
          priority: project.priority,
        }

        setProjectData(mappedProject)

        setValue('title', mappedProject.title)
        setValue('description', mappedProject.description)
        setValue('status', mappedProject.status)
        setValue('startDate', mappedProject.startDate)
        setValue('endDate', mappedProject.endDate)
        setValue('payment', mappedProject.payment)
        setValue('price', mappedProject.price)
        setValue('userId', mappedProject.userId)
      }
    }

    fetchProjectData()
  }, [projectId, setValue])

  const handleEditProject: SubmitHandler<FormDataProject> = async (
    formData,
  ) => {
    try {
      setIsloading(true)
      await updateProjectAction({ id: projectId, ...formData })
      showNotification('Projeto editado com sucesso', 'success', 5000)
    } catch (error) {
      console.error('Erro ao editar projeto', error)
      showNotification('Erro ao editar projeto', 'error')
    } finally {
      setIsloading(false)
      setIsOpenModal(false)
    }
  }

  return (
    <>
      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogTrigger className="w-full">
          <Button sizes="full" variant="outline" effects="scale">
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edite as informações do projeto</DialogTitle>
          </DialogHeader>

          {projectData ? (
            <form
              onSubmit={handleSubmit(handleEditProject)}
              className="space-y-3"
            >
              <input
                className="hidden"
                type="text"
                {...register('userId')}
                value={session.data?.user.id}
              />

              <div className="flex flex-col gap-1">
                <label>Nome do projeto</label>
                <input
                  className="text-sm"
                  type="text"
                  {...register('title')}
                  placeholder="Digite o nome do projeto"
                />
                {errors.title && (
                  <span className="text-red-800">{errors.title.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label>Descrição do projeto</label>
                <textarea
                  className="text-sm"
                  {...register('description')}
                  placeholder="Digite uma descrição"
                />
                {errors.description && (
                  <span className="text-red-800">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <label>Data de início</label>
                  <input
                    className="text-sm"
                    type="date"
                    {...register('startDate')}
                  />
                  {errors.startDate && (
                    <span className="text-red-800">
                      {errors.startDate.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label>Data de entrega</label>
                  <input
                    className="text-sm"
                    type="date"
                    {...register('endDate')}
                  />
                  {errors.endDate && (
                    <span className="text-red-800">
                      {errors.endDate.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label>Preço</label>
                <input
                  className="text-sm"
                  type="number"
                  {...register('price')}
                  placeholder="R$: 0,00"
                />
                {errors.price && (
                  <span className="text-red-800">{errors.price.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label>Forma de pagamento</label>
                <select
                  defaultValue={projectData?.payment}
                  className="text-sm"
                  {...register('payment')}
                >
                  {payments.map((payment) => (
                    <option key={payment.label} value={payment.label}>
                      {payment.label}
                    </option>
                  ))}
                </select>
                {errors.payment && (
                  <span className="text-red-800">{errors.payment.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="">Prioriades</Label>

                <div className="w-full mx-auto">
                  <select
                    defaultValue={projectData?.priority}
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
                  <span className="text-red-800">
                    {errors.priority?.message}
                  </span>
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
                {isLoading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </form>
          ) : (
            <p>Carregando informações do projeto...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
