import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationIconProps {
  children: ReactNode
  className?: string
}

export function NavigationIcon({ children, className }: NavigationIconProps) {
  return <span className={twMerge('px-2 py-1', className)}>{children} </span>
}
