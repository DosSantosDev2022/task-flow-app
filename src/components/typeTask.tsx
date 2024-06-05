import { PiPlus } from 'react-icons/pi'
import { Button } from './button'

interface TypeTaskProps {
  type: string
}

export function TypeTask({ type }: TypeTaskProps) {
  const getBorderTopColors = (type: string): string => {
    switch (type) {
      case 'Tarefas do dia':
        return 'border-t-red-600'
      case 'Em andamento':
        return 'border-t-yellow-400'
      case 'Concluídas':
        return 'border-t-green-600'

      default:
        return 'border-t-zinc-600'
    }
  }

  const borderTopClass = getBorderTopColors(type)

  return (
    <div className="col-span-4 border p-2 rounded-md  overflow-y-auto max-h-[468px] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-600 ">
      <div className={`border-t-2 p-4 ${borderTopClass} `}>
        <div className="flex items-center justify-between gap-1 rounded-lg">
          <span className="text-sm font-normal text-zinc-600">{type}</span>
          <div className="w-6 h-6 text-xs rounded-full flex items-center justify-center text-zinc-800 bg-zinc-300">
            2
          </div>
          <Button
            className="flex items-center justify-center w-6 h-6 rounded-full"
            variant="highlight"
          >
            <PiPlus className="text-zinc-50" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
        <div className=" border rounded-md p-4">a</div>
      </div>
    </div>
  )
}
