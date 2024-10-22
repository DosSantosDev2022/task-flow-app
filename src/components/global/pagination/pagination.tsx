'use client'

import { usePagination } from '@/hooks/usePagination'
import { ItemsPerPageSelector } from './ItemsPerPageSelector'
import { PaginationControls } from './PaginationControls'
import { PaginationItemCount } from './PaginationItemCount'

interface PaginationProps {
  page: number
  limit: number
  total: number
  baseUrl: string
  queryParams?: Record<string, string | number>
}

// Função para construir a URL
const buildUrl = (
  baseUrl: string,
  pageNumber: number | string,
  queryParams: Record<string, string | number>,
) => {
  const url = new URL(baseUrl, window.location.origin)
  url.searchParams.set('page', pageNumber.toString())
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString())
  })
  return url.toString()
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

  return (
    <div className="flex w-full items-center justify-between text-primary">
      {/* Total de itens */}
      <span className="flex-1 w-full font-light text-sm">
        Total de {total} itens
      </span>

      {/* Controles de Paginação */}
      <div className="flex items-center space-x-2">
        <ItemsPerPageSelector />
        <PaginationItemCount limit={limit} page={page} total={total} />
        <PaginationControls
          pages={pages as number[]}
          page={page}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          buildUrl={(pageNumber) => buildUrl(baseUrl, pageNumber, queryParams)} // Passa baseUrl e queryParams
        />
      </div>
    </div>
  )
}
