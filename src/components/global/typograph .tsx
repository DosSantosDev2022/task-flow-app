import React, { forwardRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

interface TypographProps<T extends ElementType> {
  as?: T
  className?: string
  children?: React.ReactNode
}

// Utilizando `ComponentPropsWithoutRef<T>` para suportar props nativas do elemento passado via `as`
export const Typograph = forwardRef<HTMLElement, TypographProps<ElementType>>(
  ({ as: Tag = 'p', className, children, ...props }, ref) => {
    return (
      <Tag
        className={twMerge('text-sm font-normal text-zinc-800', className)}
        ref={ref}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Typograph.displayName = 'Typograph'
