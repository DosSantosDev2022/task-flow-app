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
        'flex w-full items-center justify-start gap-2 rounded-lg hover:bg-zinc-700 py-2 px-2 hover:text-zinc-50 text-sm font-medium text-zinc-600 ',
        className,
      )}
    >
      <span>{icon} </span>
      {children}
    </Link>
  )
}
