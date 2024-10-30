'use client'

import { useState } from 'react'
import { LuMoreVertical } from 'react-icons/lu'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/global/popover'
import { ModalFormEdit } from '@/components/pages/projects/editProject/ModalFormEdit'
import { DeleteAction } from './DeleteAction'
import { ProjectData } from '@/@types/project'

export const Actions = ({ project }: { project: ProjectData }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover>
      <PopoverTrigger className="active:scale-95">
        <LuMoreVertical />
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[130px] overflow-hidden rounded-md border px-1.5 py-2 space-y-1.5">
        <ModalFormEdit project={project} />
        <DeleteAction
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          projectId={project.id || ''}
        />
      </PopoverContent>
    </Popover>
  )
}
