import { Popover, PopoverTrigger } from '@/components/global/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoFilterCircle,
} from 'react-icons/io5'

export function FilterByDate() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleClick() {
    const params = new URLSearchParams(searchParams)
    const currentSort = params.get('sort')
    const sortBy = 'createdAt' // Campo de ordenação por data

    // Alternar entre ascendente, descendente e sem ordenação
    if (currentSort === 'asc' && params.get('sortBy') === sortBy) {
      params.set('sort', 'desc')
    } else if (currentSort === 'desc' && params.get('sortBy') === sortBy) {
      params.delete('sort')
      params.delete('sortBy')
    } else {
      // Definir como ascendente se não houver ordenação atual
      params.set('sort', 'asc')
      params.set('sortBy', sortBy)
    }
    console.log(sortBy)

    const newUrl = `${pathName}?${params.toString()}`
    console.log('URL atualizada:', newUrl) // Log da URL gerada

    replace(newUrl, { scroll: false }) // Atualizando a URL
  }

  // Determinar qual ícone exibir
  const sort = searchParams.get('sort')
  const sortBy = searchParams.get('sortBy')
  let IconComponent = IoFilterCircle // Ícone padrão

  if (sortBy === 'createdAt') {
    if (sort === 'asc') {
      IconComponent = IoArrowUpCircle
    } else if (sort === 'desc') {
      IconComponent = IoArrowDownCircle
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        onClick={handleClick}
        className="text-sm active:scale-95 duration-200"
      >
        <IconComponent size={18} />
        <span>Data</span>
      </PopoverTrigger>
    </Popover>
  )
}
