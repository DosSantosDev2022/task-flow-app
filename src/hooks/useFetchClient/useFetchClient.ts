import { ClientData } from '@/@types/client'
import { SelectOption } from '@/components/global/Form/SelectField'
import { getClientById } from '@/utils/getClientById'
import { getClients } from '@/utils/getClients'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

interface UseFetchClientProps {
  session: Session | null
  clientId?: string
}

export const useFetchClient = ({ clientId, session }: UseFetchClientProps) => {
  const [clientOptions, setClientOptions] = useState<SelectOption[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) return // Apenas verificar a session

    const controller = new AbortController()
    const { signal } = controller

    const fetchClientsData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Buscando os clientes
        const { clients: clientData }: { clients: ClientData[] } =
          await getClients({ session })

        const formattedClientsOptions = clientData.map((client) => ({
          label: client.name,
          value: client.id,
        }))

        console.log('Formatted Client Options:', formattedClientsOptions) // Adicione este log

        // Atualizando o estado com as opções formatadas
        if (!signal.aborted) {
          setClientOptions(formattedClientsOptions)
        }

        // Se clientId estiver presente, busque o cliente
        if (clientId) {
          const clientById = await getClientById(clientId, session)
          if (!signal.aborted) {
            setSelectedClient(clientById)
          }
        }
      } catch (err) {
        if (!signal.aborted) {
          setError('Erro ao buscar clientes.')
          console.error('Erro ao buscar clientes:', err)
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchClientsData()

    return () => controller.abort() // Limpa a requisição quando o componente desmonta
  }, [session, clientId]) // O useEffect será executado sempre que a session ou clientId mudarem

  return { clientOptions, selectedClient, isLoading, error }
}
