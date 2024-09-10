import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface NavigationLinksProps {
  children: ReactNode
  url: string
  className?: string
  icon?: ReactNode
  isOpen: boolean
}

export function NavigationLinks({
  children,
  url,
  icon,
  className,
  isOpen,
}: NavigationLinksProps) {
  const pathName = usePathname()
  const isActive = pathName === url

  return (
    <Link
      href={url}
      className={twMerge(
        'flex items-center gap-2 w-full font-normal text-zinc-500 rounded-lg hover:bg-zinc-200  hover:text-zinc-700 duration-200 group',
        isActive ? 'bg-violet-700 text-zinc-50' : '',
        isOpen ? 'items-start px-1 py-1.5' : 'px-2 py-2.5',
        className,
      )}
    >
      <span className={isOpen ? 'flex items-center justify-center' : ''}>
        {icon}
      </span>
      {isOpen && <span className="flex gap-2">{children}</span>}
    </Link>
  )
}
