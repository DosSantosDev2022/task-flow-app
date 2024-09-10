import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationRootProps {
  children: ReactNode
  className?: string
}

export function NavigationRoot({ children, className }: NavigationRootProps) {
  return <nav className={twMerge('w-full', className)}>{children}</nav>
}
