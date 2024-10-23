import { ImSpinner9 } from 'react-icons/im'

export function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral bg-opacity-50 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-2 text-primary">
        <span className="text-lg font-semibold">{label}</span>
        <ImSpinner9 className="text-accent animate-spin text-5xl" />
      </div>
    </div>
  )
}
