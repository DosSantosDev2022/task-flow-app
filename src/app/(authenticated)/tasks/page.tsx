import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'
import { FaEllipsisVertical } from 'react-icons/fa6'

export default function TasksPage() {
  const listProject = [
    {
      name: 'Project 01',
      image: '',
    },
    {
      name: 'Project 02',
      image: '',
    },
    {
      name: 'Project 03',
      image: '',
    },
    {
      name: 'Project 04',
      image: '',
    },
    {
      name: 'Project 05',
      image: '',
    },
    {
      name: 'Project 06',
      image: '',
    },
    {
      name: 'Project 07',
      image: '',
    },
    {
      name: 'Project 08',
      image: '',
    },
    {
      name: 'Project 09',
      image: '',
    },
    {
      name: 'Project 10',
      image: '',
    },
  ]
  return (
    <div className="grid grid-cols-12 gap-2 p-2">
      <div className="col-span-3  px-2 py-3 border h-full ">
        <Input.Root className="rounded">
          <Input.Icon>
            <CiSearch size={24} className="text-zinc-400" />
          </Input.Icon>
          <Input.Input placeholder="Buscar Projeto" />
        </Input.Root>

        <div className="flex flex-col gap-1 mt-2 overflow-y-auto max-h-[424px] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-600 p-2">
          {listProject.map((p) => (
            <div
              key={p.name}
              className="px-2 py-[13px] bg-zinc-200 rounded-lg flex items-center justify-between w-full"
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={''}
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                  className="bg-zinc-800 rounded-full"
                />
                <span className="text-zinc-600 font-normal text-md">
                  {p.name}
                </span>
              </div>
              <Button
                className="w-5 flex items-center justify-center"
                variant="link"
              >
                <FaEllipsisVertical />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 border">
        <div className="bg-zinc-50 h-20 flex items-center p-2">
          <div className="flex items-center justify-start  w-full gap-2">
            <Image
              src={''}
              alt=""
              width={38}
              height={38}
              quality={100}
              className="bg-zinc-800 rounded-full"
            />
            <div className="flex items-start gap-1 flex-col w-[368px] border ">
              <span className="text-zinc-600 font-normal text-md flex items-center justify-between w-full">
                Project 01
                <div className="text-xs bg-zinc-200 rounded-md p-1">
                  35% completado
                </div>
              </span>

              <div className="w-full bg-gray-200 rounded-full h-5 ">
                <div className="bg-green-400 h-5 rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>

          <div className="border">colocar prazos do projeto</div>
        </div>
        <div>{/* componente filtro de tarefa */}</div>
        <div>
          {/* componente tipos de tarefa (a fazer / fazendo / concluido) */}
        </div>

        <div>{/* Componente cards das tarefas */}</div>
      </div>
    </div>
  )
}
