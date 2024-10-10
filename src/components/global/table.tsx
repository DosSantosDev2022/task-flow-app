import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const Table = React.forwardRef<HTMLTableElement, ComponentProps<'table'>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={twMerge('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  ),
)

Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'thead'>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={twMerge('[&_tr]:border-b bg-primary rounded-t-md ', className)}
    {...props}
  />
))

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tbody'>
>(({ className, ...props }, ref) => (
  <tbody
    className={twMerge('[&_tr:last-child]:border-0  ', className)}
    {...props}
    ref={ref}
  />
))

TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tfoot'>
>(({ className, ...props }, ref) => (
  <tfoot
    className={twMerge(
      'border-t bg-neutral font-medium [&>tr]:last:border-b-0 w-full flex items-center',
      className,
    )}
    {...props}
    ref={ref}
  />
))

TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, ComponentProps<'tr'>>(
  ({ className, ...props }, ref) => (
    <tr
      className={twMerge('border-b  transition-all  duration-300', className)}
      {...props}
      ref={ref}
    />
  ),
)

TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, ComponentProps<'th'>>(
  ({ className, ...props }, ref) => (
    <th
      className={twMerge(
        'h-10 px-2 whitespace-nowrap text-left align-middle font-medium',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
)

TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, ComponentProps<'td'>>(
  ({ className, ...props }, ref) => (
    <td
      className={twMerge(
        'px-2 py-1.5 max-w-[320px]  truncate text-secondary font-normal text-xs',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
)

TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<'caption'>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={twMerge('mt-4 text-sm', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
}
