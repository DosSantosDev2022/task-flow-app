import { SelectOption } from '@/components/global/Form/SelectField'
import { useEffect, useState } from 'react'

interface State {
  id: string
  sigla: string
  nome: string
}

// Definindo o tempo de expiração em milissegundos (1 semana)
const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000 // 1 semana

export const useGetStates = () => {
  const [states, setStates] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStates = async () => {
      const cachedData = localStorage.getItem('cachedStates')
      const cachedTimestamp = localStorage.getItem('cachedStatesTimestamp')

      const currentTime = Date.now()

      // Verificar se os dados estão no localStorage e se não estão expirados
      if (
        cachedData &&
        cachedTimestamp &&
        currentTime - Number(cachedTimestamp) < CACHE_EXPIRATION_TIME
      ) {
        setStates(JSON.parse(cachedData))
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1')

        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText)
        }

        const data: State[] = await response.json()

        // Mapeia os estados para o formato SelectOption
        const formattedStates = data.map((state) => ({
          label: state.nome,
          value: state.sigla,
        }))

        // Armazenar os estados no localStorage com o timestamp atual
        localStorage.setItem('cachedStates', JSON.stringify(formattedStates))
        localStorage.setItem('cachedStatesTimestamp', String(currentTime))
        setStates(formattedStates)
      } catch (err) {
        setError('Erro ao buscar os estados do Brasil.')
        console.error('Erro ao buscar estados:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStates()
  }, [])

  return { states, isLoading, error }
}
