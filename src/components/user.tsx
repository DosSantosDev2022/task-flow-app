'use client'
import { useSession } from 'next-auth/react'

import { Avatar } from './avatar'

export function User() {
  const { data } = useSession()
  return (
    <div className="flex items-center gap-2">
      <Avatar
        Url={data?.user?.image || ''}
        Alt={data?.user?.name || ''}
        name={data?.user?.name || ''}
      />

      <div className="flex flex-col">
        <span className="text-base font-bold text-zinc-950">
          {data?.user?.name}
        </span>
        <span className="text-zinc-600 font-normal text-xs leading-[14.52px] ">
          {data?.user?.email}
        </span>
      </div>
    </div>
  )
}
