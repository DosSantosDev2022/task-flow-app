'use client'

import {
  MdClose,
  MdEditDocument,
  MdMenu,
  MdSpaceDashboard,
} from 'react-icons/md'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { NavigationLinks } from './navigation/navigationLink'
import { FaUsers } from 'react-icons/fa'
import { SiGoogletasks } from 'react-icons/si'
import { FaGear } from 'react-icons/fa6'
import { Button } from './button'
import { useState } from 'react'

export function SideBar() {
  const navigationLinks = [
    {
      label: 'Dashboard',
      icon: <MdSpaceDashboard size={25} />,
      Url: '/',
    },
    {
      label: 'Clientes',
      icon: <FaUsers size={25} />,
      Url: '/',
    },
    {
      label: 'Projetos',
      icon: <MdEditDocument size={25} />,
      Url: '/',
    },
    {
      label: 'Tarefas',
      icon: <SiGoogletasks size={25} />,
      Url: '/tasks',
    },
    {
      label: 'Configurações',
      icon: <FaGear size={25} />,
      Url: '/',
    },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside
      className={`${isOpen ? 'w-[257px] ' : 'w-20'} h-full flex duration-500 shadow-lg border  flex-col items-start justify-start bg-zinc-50 px-4 py-6 space-y-4`}
    >
      <div className="flex items-center justify-between w-full p-2 gap-2 border-b border-zinc-200 ">
        <Logo />
        <Button
          className=" w-[40] h-[40] bg-zinc-50 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          variant="link"
        >
          {isOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
        </Button>
      </div>
      <div className="p-2 h-full flex flex-col justify-start">
        <Navigation.Root>
          <Navigation.List>
            {navigationLinks.map((link) => (
              <Navigation.Item key={link.label}>
                <NavigationLinks url={link.Url}>
                  <Navigation.Icon>{link.icon} </Navigation.Icon>
                  {isOpen && <span>{link.label}</span>}
                </NavigationLinks>
              </Navigation.Item>
            ))}
          </Navigation.List>
        </Navigation.Root>
      </div>
    </aside>
  )
}
