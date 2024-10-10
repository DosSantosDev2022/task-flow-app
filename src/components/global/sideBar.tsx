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
import { TooltipComponent } from './tooltip'

export function SideBar() {
  const navigationLinks = [
    {
      label: 'Dashboard',
      icon: <MdSpaceDashboard size={20} />,
      Url: '/dashboard',
    },
    {
      label: 'Clientes',
      icon: <FaUsers size={20} />,
      Url: '/clients',
    },
    {
      label: 'Projetos',
      icon: <MdEditDocument size={20} />,
      Url: '/projects',
    },
    {
      label: 'Tarefas',
      icon: <SiGoogletasks size={20} />,
      Url: '/tasks',
    },
    {
      label: 'Finanças',
      icon: <FaMoneyBill size={20} />,
      Url: '/finance',
    },
    {
      label: 'Configurações',
      icon: <FaGear size={20} />,
      Url: '/configurations',
    },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botão para abrir a sidebar no mobile */}
      <div
        className={`sm:hidden  top-4 left-4 z-50 ${isOpen ? 'hidden' : 'fixed'}`}
      >
        <Button
          className="w-12 h-12 bg-light rounded-lg flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(true)}
          variant="outline"
        >
          <MdMenu size={25} />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        aria-label="SideBar"
        className={`fixed sm:relative sm:translate-x-0 top-0 left-0  h-screen z-40 sm:z-0 flex flex-col
           bg-light shadow-lg border border-neutral
        transition-transform duration-500 ease-in-out ${
          isOpen
            ? 'translate-x-0 w-64 px-4 py-6'
            : 'sm:w-20 px-1 py-2 -translate-x-full sm:translate-x-0'
        }`}
      >
        {/* Header com logo e botão de abrir/fechar */}
        <div
          className={`flex items-center justify-between w-full px-2 py-2.5 gap-2 border-b border-neutral ${
            isOpen ? 'justify-center' : ''
          }`}
        >
          <Logo className={isOpen ? 'transition-all' : 'hidden'} />
          <Button
            className="w-[40] h-[40] bg-light rounded-lg flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
          >
            {isOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
          </Button>
        </div>

        {/* Links de navegação */}
        <div className="px-3 py-4 h-full w-full">
          <Navigation.Root>
            <Navigation.List>
              {navigationLinks.map((link, index) =>
                isOpen ? (
                  <NavigationLinks key={index} url={link.Url} className="">
                    <Navigation.Icon>{link.icon}</Navigation.Icon>
                    <span>{link.label}</span>
                  </NavigationLinks>
                ) : (
                  <TooltipComponent key={index} content={link.label}>
                    <NavigationLinks url={link.Url} className="justify-center">
                      <Navigation.Icon>{link.icon}</Navigation.Icon>
                    </NavigationLinks>
                  </TooltipComponent>
                ),
              )}
            </Navigation.List>
          </Navigation.Root>
        </div>
      </aside>

      {/* Overlay no mobile para fechar o menu ao clicar fora */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
