'use client'
import { useSession, signOut } from 'next-auth/react'
import { Avatar } from './avatar'
import { useState } from 'react'

export function User() {
  const { data } = useSession()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleButtonClickSignUp = () => {
    setMenuOpen(!menuOpen)
  }

  const handlesignOut = async () => {
    await signOut({ callbackUrl: '/signIn' })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button onClick={handleButtonClickSignUp}>
          <Avatar
            Url={data?.user?.image || ''}
            Alt={data?.user?.name || ''}
            name={data?.user?.name || ''}
          />
        </button>

        {menuOpen && (
          <div className="absolute top-8 right-2 w-20 bg-white animate-duration-500 animate-jump shadow-md rounded-md mt-2">
            <button
              onClick={handlesignOut}
              className="block w-full py-2 px-4 text-center text-zinc-900 hover:bg-zinc-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      <div className="flex-col hidden lg:flex">
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
