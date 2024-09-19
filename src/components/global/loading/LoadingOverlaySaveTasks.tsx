import { FaSpinner } from 'react-icons/fa'

export function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex items-center justify-center space-x-2 text-white">
        <FaSpinner size={30} className="animate-spin" />
        <span className="text-lg font-semibold">{label}</span>
      </div>
    </div>
  )
}
