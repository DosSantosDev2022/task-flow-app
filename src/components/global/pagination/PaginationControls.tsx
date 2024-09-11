import { usePagination } from "@/hooks/usePagination"
import Link from "next/link"
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu"
import { Button } from "../button"

interface PaginationControlsProps {
  page: number
  total: number
  limit: number
  isFirstPage: boolean
  isLastPage: boolean
  buildUrl: (pageNumber: number | string ) => string
}

export const PaginationControls = ({
  page,
  limit,
  total,
  isFirstPage,
  isLastPage,
  buildUrl
}: PaginationControlsProps) => {
  const { pages } = usePagination({
    page,
    limit,
    total,
  })

  return (
    <div className="flex items-center space-x-2">
      <Button
        className={`w-10 h-10 flex items-center justify-center ${isFirstPage ?
           'pointer-events-none opacity-50' : ''}`}
        variant="outline"
        asChild
      >
        <Link href={!isFirstPage ? buildUrl(1) : '#'} passHref>
          <LuChevronsLeft />
        </Link>
      </Button>
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="outline"
          asChild
          className={`w-10 h-10 flex items-center justify-center font-normal ${page === pageNumber ?
             'pointer-events-none border bg-zinc-200' : ''}`}
        >
          <Link href={page !== pageNumber ? buildUrl(pageNumber) : '#'}>
            {pageNumber}
          </Link>
        </Button>
      ))}
      <Button
        variant="outline"
        className={`w-10 h-10 flex items-center justify-center ${isLastPage ?
           'pointer-events-none opacity-50' : ''}`}
        asChild
      >
        <Link href={!isLastPage ? buildUrl(page + 1) : '#'} passHref>
          <LuChevronsRight />
        </Link>
      </Button>
    </div>
  )
}