import { useState, useEffect } from 'react'
import { SelectOption } from '@/components/global/Form/SelectField'
import { Client } from '@prisma/client'
import { useSession } from 'next-auth/react'

export const useGetClients = () => {
  const { data } = useSession()
  const [clientOptions, setClientOptions] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fazer a requisição para buscar todos os clientes
        const response = await fetch('/api/clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.user.id ?? ''}`,
          },
        })

        // Verifica se a resposta da API é válida
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText)
        }

        const { clients } = await response.json()

        if (!Array.isArray(clients)) {
          throw new Error('A resposta da API não é um array')
        }

        // Formatar as opções de clientes
        const formattedClientsOptions = clients.map((client: Client) => ({
          label: client.name,
          value: client.id,
        }))

        setClientOptions(formattedClientsOptions)
        console.log('formattedClientsOptions', formattedClientsOptions)
      } catch (err) {
        setError('Erro ao buscar clientes.')
        console.error('Erro ao buscar clientes:', err)
      } finally {
        setIsLoading(false) // Certifique-se de parar o loading independentemente do resultado
      }
    }

    fetchClients()
  }, [data?.user.id])
  return {
    clientOptions,
    isLoading,
    error,
  }
}
