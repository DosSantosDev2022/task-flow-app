'use client'
import { Button } from '@/components/global/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from '@/components/global/modal'
import { BiX } from 'react-icons/bi'

export function ModalTasksDetails() {
  return (
    <>
      <Dialog>
        <DialogTrigger
          className={`w-full h-10 bg-transparent border border-zinc-200 text-zinc-500
             hover:bg-zinc-200 hover:text-zinc-800 rounded-xl text-sm flex items-center justify-center  
             font-normal transition-all duration-500 active:scale-95`}
        >
          Abrir tarefa
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Detalhes da tarefa</DialogTitle>
            <DialogClose className="hover:bg-zinc-300 duration-300 p-1.5 rounded-3xl">
              <BiX size={20} />
            </DialogClose>
          </DialogHeader>

          <DialogFooter>
            <Button variant="highlight" sizes="full">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
