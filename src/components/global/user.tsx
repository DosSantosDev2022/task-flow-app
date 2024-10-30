'use client'
import { useSession, signOut } from 'next-auth/react'
import { Avatar } from './avatar'
import { useState } from 'react'

export function User() {
  const { data: session } = useSession()

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
            Url={session?.user?.image || ''}
            Alt={session?.user?.name || ''}
            name={session?.user?.name || ''}
          />
        </button>

        {menuOpen && (
          <div className="absolute top-8 right-2 w-20 bg-light animate-duration-500 animate-jump shadow-md rounded-md mt-2">
            <button
              onClick={handlesignOut}
              className="block w-full py-2 px-4 text-center text-primary hover:bg-light"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      <div className="flex-col hidden lg:flex">
        <span className="text-base font-bold text-primary">
          {session?.user?.name}
        </span>
        <span className="text-secondary/50 font-normal text-xs leading-[14.52px] ">
          {session?.user?.email}
        </span>
      </div>
    </div>
  )
}
