import { twMerge } from 'tailwind-merge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secundary'
    | 'outline'
    | 'highlight'
    | 'disabled'
    | 'link'
    | 'danger'
    | 'warning'
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: `bg-zinc-900 text-zinc-50 hover:bg-zinc-800  `,
    secundary: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-100',
    outline: `bg-transparent border border-zinc-800 text-zinc-50 hover:bg-zinc-600`,
    highlight: `text-zinc-50 hover:bg-violet-800 duration-300 bg-violet-900 `,
    disabled: 'bg-zinc-800 border border-zinc-800 text-cyan-50 ',
    link: `bg-transparent border-none underline`,
    danger: `bg-red-700 hover:bg-red-600 text-zinc-50`,
    warning: `bg-yellow-400 text-zinc-900 hover:bg-yellow-300`,
  }

  const _className = twMerge(
    variantClasses[variant],
    `appearance-none rounded-md px-2 py-2 text-sm font-bold shadow transition-all duration-500 w-[96px] `,
    className,
  )

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  )
}
