import { FaSpinner } from 'react-icons/fa'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <div className="flex items-center justify-center gap-3">
        <span className="text-zinc-700 font-medium text-xl">Carregando...</span>
        <FaSpinner className="text-violet-800 animate-spin text-5xl" />
      </div>
    </div>
  )
}
