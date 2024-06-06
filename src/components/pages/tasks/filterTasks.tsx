import { LuPlus } from 'react-icons/lu'
import { Button } from './button'
import Link from 'next/link'

export function FilterTasks() {
  const links = [
    {
      label: 'Todas',
      url: '',
    },
    {
      label: 'A fazer',
      url: '',
    },
    {
      label: 'Em andamento',
      url: '',
    },
    {
      label: 'Concluído',
      url: '',
    },
  ]
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <Button
        variant="highlight"
        className="flex items-center gap-2 justify-center rounded-xl h-[46px]"
      >
        <LuPlus size={18} />
        New
      </Button>
      <div className="rounded-xl w-full bg-zinc-50 h-[46px] flex justify-start px-4 py-2 items-center gap-11 ">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.url}
            className="hover:text-green-600 duration-300 px-2 py-3 rounded-lg  text-zinc-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
