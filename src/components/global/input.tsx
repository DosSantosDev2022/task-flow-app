import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputRootProps {
  children: ReactNode
  className?: string
}

export interface InputIconProps {
  children: ReactNode
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

function InputRoot({ children, className }: InputRootProps) {
  return (
    <div
      className={twMerge(
        'flex h-10 w-full items-center gap-3 rounded-2xl  bg-zinc-200 px-3 py-4 focus-within:ring-2 focus-within:ring-zinc-400',
        className,
      )}
    >
      {children}
    </div>
  )
}

function InputIcon({ children }: InputIconProps) {
  return <i>{children}</i>
}

const ComponentInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          'text-zinc-600 text-md flex-1 bg-transparent font-light outline-none placeholder:text-zinc-400',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

ComponentInput.displayName = 'Input'

export const Input = {
  Root: InputRoot,
  Icon: InputIcon,
  Input: ComponentInput,
}
