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
    className={twMerge('[&_tr]:border-b bg-zinc-100 ', className)}
    {...props}
  />
))

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tbody'>
>(({ className, ...props }, ref) => (
  <tbody
    className={twMerge('[&_tr:last-child]:border-0 ', className)}
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
      'border-t bg-zinc-100 font-medium [&>tr]:last:border-b-0 ',
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
      className={twMerge(
        'border-b duration-300 transition-all data-[state=selected]:bg-zinc-200',
        className,
      )}
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
        'h-10 px-2  text-left align-middle font-medium text-zinc-700 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
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
        'p-2 align-middle max-w-xs truncate text-zinc-500 font-normal text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
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
    className={twMerge('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

const TableItem = React.forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      className={twMerge('w-full px-2 py-1.5 flex-1', className)}
      {...props}
      ref={ref}
    />
  ),
)

TableItem.displayName = ''

export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableItem,
}
