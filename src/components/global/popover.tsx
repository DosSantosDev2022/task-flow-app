'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { twMerge } from 'tailwind-merge'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={twMerge(
      'rounded-lg bg-transparent hover:bg-zinc-300  hover:text-zinc-950 duration-300 shadow-sm border px-1.5 py-2 text-zinc-500 gap-2 flex items-center justify-center',
      className,
    )}
    {...props}
  ></PopoverPrimitive.Trigger>
))

PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={'end'}
      side="bottom"
      sideOffset={4}
      className={twMerge(
        'w-[235px] p-4 bg-white rounded-lg shadow-lg border',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = 'PopoverContent'

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={twMerge('', className)}
    {...props}
  />
))

PopoverClose.displayName = 'PopoverClose'

export { Popover, PopoverTrigger, PopoverContent, PopoverClose }
