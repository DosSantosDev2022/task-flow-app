'use client'
import { Button } from '@/components/global/button'
import { Input } from '@/components/global/Form/input'
import { FaGoogle } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MdAttachEmail } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormDataLogin,
  FormSchemaLogin,
} from '@/@types/FormSchemas/FormSchemaLogin'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataLogin>({ resolver: zodResolver(FormSchemaLogin) })

  const { data: session } = useSession()
  const router = useRouter()

  const handleLoginCredention = async (data: FormDataLogin) => {
    console.log(data)
    reset()
  }

  const handleLoginGoogle = async () => {
    await signIn()
  }

  if (session?.user) {
    router.push('/dashboard') // Navigate to /dashboard
  }

  return (
    <div className="h-screen md:flex text-zinc-50 ">
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
            <Link href={'/create'}>Crie sua conta</Link>
          </Button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-zinc-50">
        <form className="bg-zinc-50  p-16 w-[468px]">
          <h1 className="text-zinc-800 font-bold text-4xl mb-7">
            <span className="text-violet-800 ml-1 font-extrabold">
              Task <span className="text-zinc-800 font-bold">Flow</span>
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            <Input.Root>
              <Input.Icon>
                <MdAttachEmail className="text-zinc-400" />
              </Input.Icon>

              <Input.Input
                {...register('email')}
                placeholder="E-mail"
                type="email"
              />
            </Input.Root>

            <Input.Root>
              <Input.Icon>
                <RiLockPasswordFill className="text-zinc-400" />
              </Input.Icon>
              <Input.Input
                {...register('password')}
                placeholder="Senha"
                type="password"
              />
            </Input.Root>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleSubmit(handleLoginCredention)}
                variant="outline"
                effects="scale"
                className="w-full text-zinc-700 font-semibold "
              >
                Login
              </Button>
              <Button
                onClick={handleLoginGoogle}
                effects="scale"
                className="w-full text-sm font-semibold flex items-center text-zinc-50
                 bg-violet-800 hover:bg-violet-700 transition-all duration-300 justify-center gap-2"
              >
                <FaGoogle size={18} />
                Logar com o google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
