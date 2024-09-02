'use client'
import { Button } from '@/components/global/button'
import { Navigation } from '@/components/global/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'

interface ProjectCardsProps {
  name: string
  image: string
  id: string
}

export function ProjectCards({ name, id }: ProjectCardsProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }

  const projectLinks = [
    {
      id: '1',
      name: 'Ver detalhes do projeto',
      Url: '',
    },
    {
      id: '2',
      name: 'Editar projeto',
      Url: '',
    },
    {
      id: '3',
      name: 'Excluir projeto',
      Url: '',
    },
  ]

  return (
    <Link
      href={`/tasks/${id}`}
      className="px-2 py-3 cursor-pointer bg-zinc-50 border border-zinc-100 rounded-lg flex flex-col items-center justify-between w-full"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-center gap-2 w-full border py-2 px-1">
          <Image
            src={'/cover.jpg'}
            alt=""
            width={36}
            height={36}
            quality={100}
            className="bg-zinc-800 rounded-full"
          />
          <span className="text-zinc-600 font-normal text-sm w-full">
            {name}
          </span>
        </div>

        <div className="relative">
          <Button
            onClick={handleMenuOpen}
            className="w-5 flex items-center justify-center "
            variant="link"
          >
            <FaEllipsisVertical />
          </Button>
        </div>
      </div>
      {menuOpen && (
        <Navigation.Root className="w-full mt-2 ">
          <Navigation.List className="space-y-1">
            {projectLinks.map((link) => (
              <Navigation.Item className="rounded" key={link.id}>
                <Navigation.Links
                  url={link.Url}
                  className="hover:bg-zinc-100 hover:scale-105 bg-zinc-50 hover:text-zinc-600 duration-200 border border-zinc-200"
                >
                  <span className="ml-5 text-sm font-medium">{link.name}</span>
                </Navigation.Links>
              </Navigation.Item>
            ))}
          </Navigation.List>
        </Navigation.Root>
      )}
    </Link>
  )
}
