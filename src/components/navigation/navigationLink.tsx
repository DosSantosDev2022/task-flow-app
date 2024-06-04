import Link from 'next/link'
import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface NavigationLinksProps {
  children: ReactNode
  url: string
  className?: string
  icon?: ReactNode
}

export function NavigationLinks({
  children,
  url,
  icon,
  className,
}: NavigationLinksProps) {
  return (
    <Link
      href={url}
      className={twMerge(
        'flex w-full items-center justify-start gap-4 rounded-lg py-2 px-2 text-sm font-medium text-zinc-600 duration-200 hover:bg-zinc-700 hover:text-zinc-50',
        className,
      )}
    >
      <span>{icon} </span>
      {children}
    </Link>
  )
}
