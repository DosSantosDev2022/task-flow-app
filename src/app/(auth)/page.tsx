import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { FaGoogle, FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function signIn() {
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-violet-800 to-violet-900  i justify-around items-center  hidden ">
        <div className="">
          <h1 className="text-zinc-50 font-bold text-4xl ">Seja Bem vindo</h1>
          <p className="text-zinc-50 mt-1">
            Gerencie suas tarefas com nosso app
          </p>
          <Button
            variant="highlight"
            type="submit"
            className="block w-32 bg-white text-violet-700 hover:text-zinc-50 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Crie sua conta
          </Button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-zinc-50">
        <form action="" className="bg-zinc-50  p-16 w-[468px]">
          <h1 className="text-zinc-800 font-bold text-4xl mb-7">
            <span className="text-violet-800 ml-1 font-extrabold">
              Task <span className="text-zinc-800 font-bold">Flow</span>
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            <Input.Root>
              <Input.Icon>
                <FaUser className="text-zinc-400" />
              </Input.Icon>

              <Input.Input placeholder="E-mail" type="email" />
            </Input.Root>

            <Input.Root>
              <Input.Icon>
                <RiLockPasswordFill className="text-zinc-400" />
              </Input.Icon>
              <Input.Input placeholder="Senha" type="password" />
            </Input.Root>

            <div className="flex flex-col gap-2">
              <Button className="w-full">Login</Button>
              <Button className="w-full flex items-center justify-center gap-2">
                <FaGoogle />
                Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
