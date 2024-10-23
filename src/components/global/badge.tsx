import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeProps extends ComponentProps<'span'> {
  status:
    | 'TODOS'
    | 'PENDENTE'
    | 'FINALIZADO'
    | 'ALTA'
    | 'MEDIA'
    | 'BAIXA'
    | 'EM_ANDAMENTO'
    | 'A_FAZER'
    | 'CONCLUIDO'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, status, ...props }, ref) => {
    const statusClasses = {
      TODOS: '',
      PENDENTE: 'bg-red-500', // Define as cores para cada status
      FINALIZADO: 'bg-green-500',
      ALTA: 'bg-red-500',
      MEDIA: 'bg-blue-500',
      BAIXA: 'bg-green-500',
      A_FAZER: 'bg-red-500',
      EM_ANDAMENTO: 'bg-yellow-500',
      CONCLUIDO: 'bg-green-500',
    }

    const statusText = {
      MEDIA: 'Média',
      ALTA: 'Alta',
      BAIXA: 'Baixa',
      TODOS: 'Todos',
      PENDENTE: 'Pendente',
      FINALIZADO: 'Finalizado',
      A_FAZER: 'A fazer',
      EM_ANDAMENTO: 'Em andamento',
      CONCLUIDO: 'Concluído',
    }

    return (
      <span
        className={twMerge(
          `w-[65px] h-[22px] px-1.5 py-[2px] rounded-2xl text-neutral
          text-[10px] font-normal leading-7 flex items-center justify-center`,
          statusClasses[status], // Aplica a classe de acordo com o status
          className,
        )}
        {...props}
        ref={ref}
      >
        {statusText[status]}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
