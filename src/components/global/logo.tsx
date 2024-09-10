import { twMerge } from 'tailwind-merge'

export function Logo({ className }: { className: string }) {
  return (
    <div
      className={twMerge('flex items-center justify-center w-full', className)}
    >
      <h1 className="text-2xl font-extrabold whitespace-nowrap">
        Task <span className="text-violet-700">Flow</span>
      </h1>
    </div>
  )
}
