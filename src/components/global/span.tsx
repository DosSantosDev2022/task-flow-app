import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Span = React.forwardRef<
  HTMLElement, // Ref para elementos nativos
  ComponentProps<'span'>
>(({ className, ...props }, ref) => (
  <span
    className={twMerge('text-xs, text-zinc-400', className)}
    ref={ref}
    {...props}
  />
))

Span.displayName = 'Span'
