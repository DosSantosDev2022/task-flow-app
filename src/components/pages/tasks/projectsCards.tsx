import { Button } from '@/components/global/button'
import Image from 'next/image'
import { FaEllipsisVertical } from 'react-icons/fa6'

interface ProjectCardsProps {
  name: string
  image: string
}

export function ProjectCards({ name, image }: ProjectCardsProps) {
  return (
    <div className="px-2 py-[13px] bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-between w-full">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={image}
          alt=""
          width={32}
          height={32}
          quality={100}
          className="bg-zinc-800 rounded-full"
        />
        <span className="text-zinc-600 font-normal text-md">{name}</span>
      </div>
      <Button className="w-5 flex items-center justify-center" variant="link">
        <FaEllipsisVertical />
      </Button>
    </div>
  )
}
