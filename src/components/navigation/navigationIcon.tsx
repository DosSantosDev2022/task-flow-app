import { ReactNode } from 'react'

interface NavigationIconProps {
  children: ReactNode
}

export function NavigationIcon({ children }: NavigationIconProps) {
  return <span>{children} </span>
}
