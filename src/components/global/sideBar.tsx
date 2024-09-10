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
import { FaMoneyBill, FaUsers } from 'react-icons/fa'
import { SiGoogletasks } from 'react-icons/si'
import { FaGear } from 'react-icons/fa6'
import { Button } from './button'
import { useState } from 'react'

export function SideBar() {
  const navigationLinks = [
    {
      label: 'Dashboard',
      icon: <MdSpaceDashboard size={22} />,
      Url: '/dashboard',
    },
    {
      label: 'Clientes',
      icon: <FaUsers size={22} />,
      Url: '/clients',
    },
    {
      label: 'Projetos',
      icon: <MdEditDocument size={22} />,
      Url: '/projects',
    },
    {
      label: 'Tarefas',
      icon: <SiGoogletasks size={22} />,
      Url: '/tasks',
    },
    {
      label: 'Finanças',
      icon: <FaMoneyBill size={22} />,
      Url: '/finance',
    },
    {
      label: 'Configurações',
      icon: <FaGear size={22} />,
      Url: '/configurations',
    },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside
      aria-label="SideBar"
      className={`${isOpen ? 'w-64 px-4 py-6 ' : 'w-20 px-1 py-2'} h-screen left-0  flex duration-500 shadow-lg border z-40 flex-col bg-zinc-50  space-y-4`}
    >
      <div
        className={`flex items-center justify-between w-full px-2 
          py-2.5 gap-2 border-b border-zinc-200 ${isOpen ? 'justify-center' : ''}`}
      >
        <Logo className={isOpen ? 'transition-all' : 'hidden'} />
        <Button
          className=" w-[40] h-[40] bg-zinc-50 rounded-lg flex items-center  justify-center"
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        >
          {isOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
        </Button>
      </div>
      <div className="px-3 py-4 h-full w-full">
        <Navigation.Root>
          <Navigation.List>
            {navigationLinks.map((link) => (
              <Navigation.Item key={link.label}>
                <NavigationLinks isOpen url={link.Url}>
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
