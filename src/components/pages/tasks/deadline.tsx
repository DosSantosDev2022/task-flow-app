import { FaClock } from 'react-icons/fa'

export function Deadiline() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="flex items-center justify-between gap-1">
        <FaClock className="text-orange-400" size={22} />
        <span className="text-orange-400 font-medium">Prazo</span>
      </div>
      <span className="text-xs text-center flex"> 15 de Agosto 2024</span>
    </div>
  )
}
