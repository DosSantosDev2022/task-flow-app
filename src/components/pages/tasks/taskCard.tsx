import { Deadiline } from './deadline'

interface TaskCardProps {
  title: string
  /*  deadline: string */
  status: string
}

export function TaskCard({ title, status }: TaskCardProps) {
  return (
    <div className=" border rounded-md p-4 flex items-center gap-2 justify-between w-full">
      <div className="w-full space-y-2">
        <div className="flex w-full justify-between">
          <h4 className="text-base font-medium text-zinc-600">{title}</h4>
          <span className="text-[9px] w-16 text-center text-zinc-50 font-light p-1 rounded-lg bg-violet-600">
            {status}
          </span>
        </div>

        <Deadiline.Root className="justify-start">
          <Deadiline.Icon />
          <Deadiline.Date date="20/05/2024" />
        </Deadiline.Root>
      </div>
    </div>
  )
}
