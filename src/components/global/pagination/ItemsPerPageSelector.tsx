'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/global/popover'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
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
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const searchParams = useSearchParams()
  const pathaname = usePathname()
  const { replace } = useRouter()

  const handleItemsPerPageSelector = (newItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams)

    setItemsPerPage(Number(newItemsPerPage))

    if (itemsPerPage) {
      params.set('limit', newItemsPerPage)
    } else {
      params.delete('limit')
    }

    replace(`${pathaname}?${params.toString()}`)
  }
  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Itens por página</p>
        <Popover>
          <PopoverTrigger className="w-16 border flex space-x-1 active:scale-75">
            <span>10</span>
            <CgArrowsExchangeAltV size={18} className="font-bold" />
          </PopoverTrigger>
          <PopoverContent
            className="w-16 flex flex-col items-center justify-center
         space-y-1 px-1 py-1.5"
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
