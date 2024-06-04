import { IoNotifications } from 'react-icons/io5'
import { Input } from './input'
import { AiFillMessage } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'

export function Header() {
  return (
    <header className="bg-zinc-50 h-24 flex items-center">
      <div className="flex items-center justify-between w-full px-[18px] py-6 gap-3 ">
        <span className="text-zinc-300">Dashboard</span>
        <Input.Root className="w-[442px] ">
          <Input.Icon>
            <CiSearch size={24} className="text-zinc-400" />
          </Input.Icon>
          <Input.Input placeholder="Search" type="search" />
        </Input.Root>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button>
              <AiFillMessage className="text-zinc-500" size={24} />
            </button>
            <button>
              <IoNotifications className="text-zinc-500" size={24} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full bg-zinc-400 w-[40px] h-[40px] "></div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-zinc-950">
                Juliano Santos
              </span>
              <span className="text-zinc-600 font-normal text-xs leading-[14.52px] ">
                dossantosdevoficial@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
