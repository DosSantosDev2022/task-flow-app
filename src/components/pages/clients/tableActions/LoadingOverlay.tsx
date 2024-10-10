import { FaSpinner } from 'react-icons/fa'

export const LoadingOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-50 z-10">
    <FaSpinner className="animate-spin duration-500" />
  </div>
)
