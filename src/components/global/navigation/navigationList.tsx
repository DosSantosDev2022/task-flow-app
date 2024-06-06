import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationListProps {
  children: ReactNode
  className?: string
}

export function NavigationList({ children, className }: NavigationListProps) {
  return <ul className={twMerge(' space-y-4', className)}>{children} </ul>
}
