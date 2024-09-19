import { ReactNode } from 'react'
import { FaClock } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface DeadilineRootProps {
  children: ReactNode
  className?: string
}

/* Futuramente colocar uma logica onde será verificado se 
     a tarefa esta fora do prazo, e se for true mudar a cor do background
     do componente para vermelho
  */

export function DeadilineRoot({ children, className }: DeadilineRootProps) {
  return (
    <div
      className={twMerge(
        'flex flex-row xs:flex-col gap-1 items-start sm:items-center justify-center ',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DeadlineIcon() {
  return (
    <div className="flex items-center justify-between px-2 py-1 gap-1 bg-green-400 rounded-md">
      <FaClock className="text-zinc-50" size={14} />
      <span className="text-zinc-50 font-normal text-xs">Prazo</span>
    </div>
  )
}

interface DeadilineDateProps {
  date: string
  className?: string
}

export function DeadilineDate({ date, className }: DeadilineDateProps) {
  return (
    <span
      className={twMerge(
        'text-xs text-center bg-zinc-200 rounded-md px-2 py-1 text-zinc-600',
        className,
      )}
    >
      {date}
    </span>
  )
}

export const Deadiline = {
  Root: DeadilineRoot,
  Icon: DeadlineIcon,
  Date: DeadilineDate,
}
