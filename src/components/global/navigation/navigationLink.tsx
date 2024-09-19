import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface NavigationLinksProps {
  children: ReactNode
  url: string
  className?: string
}

export function NavigationLinks({
  children,
  url,
  className,
}: NavigationLinksProps) {
  const pathName = usePathname()
  const isActive = pathName === url

  return (
    <Link
      href={url}
      className={twMerge(
        `flex items-center justify-start px-1.5 py-2 gap-2 w-full font-normal
         text-zinc-500 rounded-lg hover:bg-zinc-200  hover:text-zinc-700 duration-200 group`,
        isActive ? 'bg-violet-700 text-zinc-50' : '',
        className,
      )}
    >
      {children}
    </Link>
  )
}
