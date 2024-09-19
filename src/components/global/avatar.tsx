'use client'
import Image from 'next/image'
import { useState } from 'react'

interface AvatarProps {
  Url: string
  Alt: string
  name: string
}

export function Avatar({ Alt, Url, name }: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const handleError = () => {
    setImageError(true)
  }
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }
  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center">
      {imageError ? (
        <div className="flex h-full w-full items-center justify-center border-2 border-zinc-400 rounded-full p-2 bg-gray-300 text-xl text-zinc-800">
          {getInitial(name)}
        </div>
      ) : (
        <Image
          className="h-10 w-10 rounded-full border-2 border-white"
          alt={Alt}
          src={Url}
          width={40}
          height={40}
          quality={100}
          onError={handleError}
        />
      )}
    </div>
  )
}
