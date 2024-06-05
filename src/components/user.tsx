'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export function User() {
  const { data } = useSession()
  return (
    <div className="flex items-center gap-2">
      <Image
        src={data?.user?.image || ''}
        alt=""
        width={40}
        height={40}
        quality={100}
        className="w-[40px] h-[40px] rounded-full"
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
