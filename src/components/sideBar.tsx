import { Logo } from './logo'

export function SideBar() {
  return (
    <aside className="w-[257px] h-full bg-zinc-50 px-4 py-6">
      <div className="p-2 border">
        <Logo />
      </div>
    </aside>
  )
}
