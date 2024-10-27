'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { twMerge } from 'tailwind-merge'

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={twMerge(
      'w-full relative h-4.5 overflow-hidden rounded-full bg-neutral',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full flex items-center justify-end py-0.5 px-1.5 bg-blue-500 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      <span className="flex items-center justify-center text-xs font-medium text-neutral">
        {value} %
      </span>
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
