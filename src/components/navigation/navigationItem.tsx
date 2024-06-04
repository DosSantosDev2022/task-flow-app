import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationItemProps {
  children: ReactNode
  className?: string
}

export function NavigationItem({ children, className }: NavigationItemProps) {
  return (
    <li
      className={twMerge(
        'flex w-full items-center justify-start rounded-md ',
        className,
      )}
    >
      {children}
    </li>
  )
}
