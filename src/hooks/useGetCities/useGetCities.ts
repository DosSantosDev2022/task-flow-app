import { SelectOption } from '@/components/global/Form/SelectField'
import { useEffect, useState } from 'react'

interface City {
  nome: string
  codigo_ibge: string
}

interface UseGetCitiesProps {
  uf?: string // uf agora é opcional
}

// Definindo o tempo de expiração em milissegundos (1 semana)
const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000 // 1 semana

export const useGetCities = ({ uf }: UseGetCitiesProps) => {
  const [cities, setCities] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCities = async () => {
      if (!uf) {
        // Se não houver uf, resetar cidades
        setCities([])
        return
      }

      const cachedData = localStorage.getItem(`cachedCities_${uf}`)
      const cachedTimestamp = localStorage.getItem(
        `cachedCitiesTimestamp_${uf}`,
      )

      const currentTime = Date.now()

      // Verificar se os dados estão no localStorage e se não estão expirados
      if (
        cachedData &&
        cachedTimestamp &&
        currentTime - Number(cachedTimestamp) < CACHE_EXPIRATION_TIME
      ) {
        setCities(JSON.parse(cachedData))
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`,
        )

        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText)
        }

        const data: City[] = await response.json()

        const formattedCities = data.map((city) => ({
          label: city.nome,
          value: city.nome,
        }))

        // Armazenar as cidades no localStorage com o timestamp atual
        localStorage.setItem(
          `cachedCities_${uf}`,
          JSON.stringify(formattedCities),
        )
        localStorage.setItem(`cachedCitiesTimestamp_${uf}`, String(currentTime))
        setCities(formattedCities)
      } catch (err) {
        setError('Erro ao buscar cidades')
        console.error('Erro ao buscar cidades:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [uf])

  return { cities, isLoading, error }
}
