import { ImSpinner9 } from 'react-icons/im'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <div className="flex items-center justify-center gap-3">
        <span className="text-primary font-medium text-xl">Carregando...</span>
        <ImSpinner9 className="text-accent animate-spin text-5xl" />
      </div>
    </div>
  )
}
