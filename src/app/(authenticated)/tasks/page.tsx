import { Deadiline } from '@/components/pages/tasks/deadline'
import Image from 'next/image'
import { ProgressBar } from '@/components/pages/tasks/progressBar'
import { Tasks } from '@/components/pages/tasks/tasks'
import { ProjectList } from '@/components/pages/tasks/projects'

export default function TasksPage() {
  return (
    <div className="grid grid-cols-12 gap-2 p-2">
      <ProjectList />
      <div className="col-span-9 border">
        <div className="bg-zinc-50 h-20 flex items-center justify-between w-full p-2">
          <div className="flex items-center justify-start  w-full gap-2">
            <Image
              src={''}
              alt=""
              width={38}
              height={38}
              quality={100}
              className="bg-zinc-800 rounded-full"
            />
            <div className="flex items-start gap-1 flex-col w-[368px]">
              <span className="text-zinc-600 font-normal text-md flex items-center justify-between w-full">
                Project 01
                <div className="text-xs bg-zinc-200 rounded-md p-1">
                  35% completado
                </div>
              </span>

              <ProgressBar />
            </div>
          </div>
          <Deadiline.Root>
            <Deadiline.Icon />
            <Deadiline.Date date="20/05/2024" />
          </Deadiline.Root>
        </div>

        <Tasks />
      </div>
    </div>
  )
}
