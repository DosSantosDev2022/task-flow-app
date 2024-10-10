import { IoNotifications } from 'react-icons/io5'
import { Input } from '@/components/global/Form/input'
import { AiFillMessage } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { User } from './user'

export function Header() {
  return (
    <header className="bg-light h-24 flex items-center">
      <div className="flex items-center justify-between w-full px-4 py-6 gap-3">
        {/* Título do Dashboard */}
        <span className="text-neutral text-sm sm:text-lg">Dashboard</span>

        {/* Campo de busca - se adapta à largura da tela */}
        <Input.Root className="hidden md:flex w-[240px] lg:w-[442px]">
          <Input.Icon>
            <CiSearch size={24} className="text-secondary/50" />
          </Input.Icon>
          <Input.Input placeholder="Search" type="search" />
        </Input.Root>

        {/* Ícones de mensagem e notificação + Usuário */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button>
              <AiFillMessage className="text-primary/50" size={24} />
            </button>
            <button>
              <IoNotifications className="text-primary/50" size={24} />
            </button>
          </div>

          {/* Usuário */}
          <User />
        </div>
      </div>
    </header>
  )
}
