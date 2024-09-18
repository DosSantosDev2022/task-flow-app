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
      if (!baseUrl) {
        throw new Error('baseUrl deve ser uma string válida')
      }

      // Converta pageNumber para number, se necessário
      const pageAsNumber =
        typeof pageNumber === 'string' ? parseInt(pageNumber, 10) : pageNumber

      const url = new URL(baseUrl, window.location.origin)
      url.searchParams.set('page', pageAsNumber.toString())

      // Adicione parâmetros de consulta adicionais, se existirem
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.set(key, value.toString())
      })

      return url.toString()
    } catch (error) {
      console.error('Erro ao construir URL', error)
      return ''
    }
  }

  return (
    <div className="flex w-full items-center justify-between text-zinc-800">
      {/* Total de itens */}
      <span className="flex-1 w-full font-medium text-sm">
        Total de {total} itens
      </span>
      {/* Botão de ação para alterar total por página */}
      <div className="flex items-center space-x-2">
        <ItemsPerPageSelector />
        {/*  total por pagina */}
        <PaginationItemCount limit={limit} page={page} total={total} />

        {/* Links para paginação */}
        <PaginationControls
          buildUrl={buildUrl}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          limit={limit}
          page={page}
          total={total}
        />
      </div>
    </div>
  )
}
