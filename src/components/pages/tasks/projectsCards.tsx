'use client'
import { Button } from '@/components/global/button'
import { Navigation } from '@/components/global/navigation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { EditProjectModal } from './modal/editProjectModal'
import { DeleteProjectModal } from './modal/deletProjectModal'

interface ProjectCardsProps {
  name: string
  image: string
  id: string
}

export function ProjectCards({ name, id }: ProjectCardsProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<'edit' | 'delete' | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleMenuOpen = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen, handleClickOutside])

  const projectLinks = [
    {
      id: '1',
      name: 'Tarefas do projeto',
      action: () => {
        // Navegar para a página de tarefas
        router.push(`/tasks/${id}`)
      },
    },
    {
      id: '2',
      name: 'Editar projeto',
      action: () => setActiveModal('edit'),
    },
    {
      id: '3',
      name: 'Excluir projeto',
      action: () => setActiveModal('delete'),
    },
  ]

  return (
    <>
      <div className="px-2 py-3  bg-zinc-50 border border-zinc-100 rounded-lg flex flex-col items-center justify-between w-full">
        <div className="flex w-full justify-between gap-2 items-start">
          <div className="flex items-center justify-center gap-2 w-full border py-2 px-1">
            <Image
              src={'/cover.jpg'}
              alt="Icone do projeto"
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
              className="flex items-center justify-center "
              variant="link"
              aria-expanded={menuOpen}
              sizes="icon"
            >
              <FaEllipsisVertical className="text-zinc-400 hover:text-zinc-600 duration-300" />
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="w-full " ref={menuRef}>
            <Navigation.Root className="w-full mt-2 ">
              <Navigation.List className="space-y-1">
                {projectLinks.map((link) => (
                  <Navigation.Item className="rounded" key={link.id}>
                    <Button
                      onClick={link.action}
                      variant="outline"
                      sizes="full"
                      className="justify-start hover:scale-105 duration-200"
                    >
                      <span className="ml-5 text-sm font-medium">
                        {link.name}
                      </span>
                    </Button>
                  </Navigation.Item>
                ))}
              </Navigation.List>
            </Navigation.Root>
          </div>
        )}
      </div>

      {/* Modal para Editar Projeto */}
      <EditProjectModal
        isOpen={activeModal === 'edit'}
        isOnChange={() => setActiveModal(null)}
      />
      {/* Modal para Excluir Projeto */}
      <DeleteProjectModal
        isOpen={activeModal === 'delete'}
        isOnChange={() => setActiveModal(null)}
      />
    </>
  )
}
