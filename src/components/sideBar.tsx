import { MdEditDocument, MdSpaceDashboard } from 'react-icons/md'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { NavigationLinks } from './navigation/navigationLink'
import { FaUsers } from 'react-icons/fa'
import { SiGoogletasks } from 'react-icons/si'
import { FaGear } from 'react-icons/fa6'

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

  return (
    <aside className="w-[257px] h-full bg-zinc-50 px-4 py-6 space-y-4">
      <div className="flex items-center w-full p-2 border-b border-zinc-200 ">
        <Logo />
      </div>
      <div className="p-2 h-full flex flex-col justify-start">
        <Navigation.Root>
          <Navigation.List>
            {navigationLinks.map((link) => (
              <Navigation.Item key={link.label}>
                <NavigationLinks url={link.Url}>
                  <Navigation.Icon>{link.icon} </Navigation.Icon>
                  {link.label}
                </NavigationLinks>
              </Navigation.Item>
            ))}
          </Navigation.List>
        </Navigation.Root>
      </div>
    </aside>
  )
}
