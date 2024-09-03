import React from 'react'
import { LuChevronLeft, LuChevronRight, LuMoreHorizontal } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

const Pagination = React.forwardRef<HTMLElement, React.ComponentProps<'nav'>>(
  ({ className, ...props }, ref) => (
    <nav
      role="navigation"
      aria-label="navigation"
      className={twMerge('mx-auto flex  w-full justify-center py-2', className)}
      {...props}
      ref={ref}
    />
  ),
)

Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    className={twMerge('flex flex-row items-center gap-1', className)}
    {...props}
    ref={ref}
  />
))

PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    className={twMerge('flex items-center justify-center', className)}
    {...props}
    ref={ref}
  />
))

PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : 'false'}
    className={twMerge(
      ` hover:opacity-70 duration-300 border p-2 rounded-lg w-10 h-10 flex items-center justify-center
      ${isActive ? 'bg-zinc-50 text-violet-700' : 'bg-violet-700 text-zinc-50'}`,
      className,
    )}
    {...props}
  />
)

PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="go to previous page"
    className={twMerge('gap-1 pl-2.5 cursor-pointer', className)}
    {...props}
  >
    <LuChevronLeft className="h-4 w-4" />
  </PaginationLink>
)

PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="go to Next page"
    className={twMerge('gap-1 pr-2.5 cursor-pointer', className)}
    {...props}
  >
    <LuChevronRight className="h-4 w-4" />
  </PaginationLink>
)

PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={twMerge('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <LuMoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
