'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/global/popover'
import { Button } from '../button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const perPage = [
  {
    label: '10',
  },
  {
    label: '20',
  },
  {
    label: '30',
  },
  {
    label: '40',
  },
]

export function ItemsPerPageSelector() {
  const [itemsPerPage, setItemsPerPage] = useState(10) // Estado para controlar os itens por página
  const [popoverOpen, setPopoverOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathaname = usePathname()
  const { replace } = useRouter()

  const handleItemsPerPageSelector = (newItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams)

    setItemsPerPage(Number(newItemsPerPage)) // Atualiza o estado local com o novo valor de itemsPerPage

    if (newItemsPerPage) {
      params.set('limit', newItemsPerPage)
    } else {
      params.delete('limit')
    }

    replace(`${pathaname}?${params.toString()}`) // Atualiza a URL com o novo parâmetro 'limit'
    setPopoverOpen(false)
  }

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-light">Itens por página</p>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger className="w-12 border flex space-x-[2px] active:scale-95">
            {/* Exibe o valor atual de 'limit' ou o valor padrão (10) */}
            <span>{searchParams.get('limit') || itemsPerPage}</span>
          </PopoverTrigger>
          <PopoverContent
            className="w-12 flex flex-col gap-1 items-center justify-center
         space-x-[2px] p-1"
            sideOffset={4}
            align="end"
            side="top"
          >
            {perPage.map((item, index) => (
              <Button
                onClick={() => handleItemsPerPageSelector(item.label)}
                key={index}
                variant="outline"
                sizes="full"
              >
                {item.label}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
