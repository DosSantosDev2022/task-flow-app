import { SelectOption } from '@/components/global/Form/SelectField'
import { ClientData, getClients } from '@/utils/getClients'
import { Session } from 'next-auth'
import { useEffect, useMemo, useState } from 'react'

export const useFetchClient = (session: Session | null) => {
  const [clients, setClients] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!session) return
    const fetchClientsData = async () => {
      try {
        setIsLoading(true)
        const { clients: clientData }: { clients: ClientData[] } =
          await getClients({ session })

        const formattedClients = clientData.map((client) => ({
          label: client.name,
          value: client.id,
        }))
        setClients(formattedClients)
      } catch (error) {
        console.error('Erro ao buscar clientes', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchClientsData()
  }, [session])

  const memoizedClients = useMemo(() => clients, [clients])

  return { memoizedClients, isLoading }
}
