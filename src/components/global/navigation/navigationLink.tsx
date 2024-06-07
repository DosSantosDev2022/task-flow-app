import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathName = usePathname()
  const isActive = pathName === url

  return (
    <Link
      href={url}
      className={twMerge(
        'flex w-full items-center justify-start gap-2 rounded-lg py-2 px-2 text-sm font-medium text-zinc-600 ',
        isActive
          ? 'bg-violet-700 text-zinc-50'
          : 'hover:bg-violet-700 hover:text-zinc-50',
        className,
      )}
    >
      <span>{icon} </span>
      {children}
    </Link>
  )
}
