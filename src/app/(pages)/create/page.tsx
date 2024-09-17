'use client'
import { Button } from '@/components/global/button'
import { Input } from '@/components/global/Form/input'
import { FaGoogle, FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { MdAttachEmail } from 'react-icons/md'

export default function CreateAccountPage() {
  // Função para login com credenciais
  const handleLoginCredentials = async () => {}

  // Função para login com o google
  const handleLoginGoogle = async () => {
    await signIn()
  }

  /* if (session?.user) {
    router.push('/dashboard') // Navigate to /dashboard
  } */

  return (
    <div className="h-screen md:flex text-zinc-50 ">
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-zinc-50">
        <form action="" className="bg-zinc-50  p-16 w-[468px]">
          <h1 className="text-zinc-800 font-bold text-4xl mb-7">
            <span className="text-violet-800 ml-1 font-extrabold">
              Task <span className="text-zinc-800 font-bold">Flow</span>
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            <form action="" className="space-y-3">
              <Input.Root>
                <Input.Icon>
                  <FaUser className="text-zinc-400" />
                </Input.Icon>

                <Input.Input placeholder="Nome completo" type="text" />
              </Input.Root>

              <Input.Root>
                <Input.Icon>
                  <MdAttachEmail className="text-zinc-400" />
                </Input.Icon>

                <Input.Input placeholder="E-mail" type="email" />
              </Input.Root>

              <Input.Root>
                <Input.Icon>
                  <RiLockPasswordFill className="text-zinc-400" />
                </Input.Icon>
                <Input.Input placeholder="Senha" type="password" />
              </Input.Root>

              <Input.Root>
                <Input.Icon>
                  <RiLockPasswordFill className="text-zinc-400" />
                </Input.Icon>
                <Input.Input placeholder="Confirme a senha" type="password" />
              </Input.Root>
            </form>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleLoginCredentials}
                variant="outline"
                effects="scale"
                className="w-full text-zinc-700 font-semibold "
              >
                Criar conta
              </Button>
              <Button
                onClick={handleLoginGoogle}
                effects="scale"
                className="w-full text-sm font-semibold flex items-center text-zinc-50
                 bg-violet-800 hover:bg-violet-700 transition-all duration-300 justify-center gap-2"
              >
                <FaGoogle size={18} />
                Crie com o google
              </Button>
            </div>

            <div className="w-full text-end px-1">
              <Link
                className="text-zinc-500 hover:text-zinc-400 duration-300"
                href={'/signIn'}
              >
                Já possuí conta ?
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-violet-500 to-violet-900  i justify-around items-center  hidden ">
        <div className="space-y-3">
          <h1 className="font-bold text-5xl ">Seja Bem vindo</h1>
          <p className="font-normal">Gerencie suas tarefas com nosso app.</p>
          <Button
            asChild
            variant="secundary"
            effects="scale"
            type="submit"
            className="w-40 font-semibold flex items-center justify-center"
          >
            <Link href={'/signIn'}>Faça seu login</Link>
          </Button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
    </div>
  )
}
