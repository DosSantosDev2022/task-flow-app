import Link from 'next/link'
import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'
import { Button } from '../button'

interface PaginationControlsProps {
  pages: number[]
  page: number
  isFirstPage: boolean
  isLastPage: boolean
  buildUrl: (pageNumber: number | string) => string
}

export const PaginationControls = ({
  pages,
  page,
  isFirstPage,
  isLastPage,
  buildUrl,
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Botão para a primeira página */}
      <Button
        className={`w-12 flex items-center justify-center ${
          isFirstPage ? 'pointer-events-none opacity-50' : ''
        }`}
        variant="outline"
        asChild
      >
        <Link href={!isFirstPage ? buildUrl(1) : '#'} passHref>
          <LuChevronsLeft />
        </Link>
      </Button>

      {/* Renderiza os números de página */}
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="outline"
          asChild
          className={`w-12 flex items-center justify-center font-normal ${
            page === pageNumber ? 'pointer-events-none border bg-neutral' : ''
          }`}
        >
          <Link href={page !== pageNumber ? buildUrl(pageNumber) : '#'}>
            {pageNumber}
          </Link>
        </Button>
      ))}

      {/* Botão para a próxima página */}
      <Button
        variant="outline"
        className={`w-12 flex items-center justify-center ${
          isLastPage ? 'pointer-events-none opacity-50' : ''
        }`}
        asChild
      >
        <Link href={!isLastPage ? buildUrl(page + 1) : '#'} passHref>
          <LuChevronsRight />
        </Link>
      </Button>
    </div>
  )
}
