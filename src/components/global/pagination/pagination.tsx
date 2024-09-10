'use client'

import { usePagination } from '@/hooks/usePagination'
import { Button } from '@/components/global/button'
import Link from 'next/link'
import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'
import { error } from 'console'

interface PaginationProps {
  page: number
  limit: number
  total: number
  baseUrl: string
  queryParams?: Record<string, string | number>
}

export function Pagination({
  page,
  limit,
  total,
  baseUrl,
  queryParams = {},
}: PaginationProps) {
  const { pages } = usePagination({
    page,
    limit,
    total,
  })

  const isFirstPage = page === 1
  const isLastPage = page === Math.ceil(total / limit)

  const buildUrl = (pageNumber: string | number) => {
  
    try {
      if(!baseUrl) {
          throw new Error('baseUrl deve ser uma string válida')
      }

      // crie a url
      const url = new URL(baseUrl, window.location.origin)
      url.searchParams.set('page', pageNumber.toString())

      // Adicione parâmetros de consulta adicionais, se existirem
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.set(key, value.toString())
      })
      return url.toString()
    } catch(error ) {
      console.error ('Erro ao construír URL', error)
      return ''
    } 
  }

  return (
    <div className="mt-8 flex w-full items-center justify-between p-2">
      <span className="flex w-full font-light text-light">
        Mostrando {Math.min(limit, total - (page - 1) * limit)} de {total}
      </span>

      <div className="flex items-center gap-2">
        <Button
          className={`flex items-center justify-center ${
            isFirstPage ? 'pointer-events-none opacity-50' : ''
          }`}
          sizes="icon"
          variant="outline"
          asChild
        >
          <Link href={!isFirstPage ? buildUrl(1) : '#'} passHref>
            <LuChevronsLeft />
          </Link>
        </Button>
        {pages.map((pageNumber) => (
          <Button
            variant="outline"
            asChild
            sizes="icon"
            key={pageNumber}
            className={`flex  items-center justify-center ${
              page === pageNumber ? 'pointer-events-none border opacity-50' : ''
            }`}
          >
            <Link href={page !== pageNumber ? buildUrl(pageNumber) : '#'}>
              {pageNumber}
            </Link>
          </Button>
        ))}

        <Button
          variant="outline"
          sizes="icon"
          className={`flex items-center justify-center ${
            isLastPage ? 'pointer-events-none opacity-50' : ''
          }`}
          asChild
        >
          <Link href={!isLastPage ? buildUrl(page + 1) : '#'} passHref>
            <LuChevronsRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
