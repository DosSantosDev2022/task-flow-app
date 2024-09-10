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
        'flex w-full items-center justify-start hover:scale-105  rounded-md duration-300 ',
        className,
      )}
    >
      {children}
    </li>
  )
}
