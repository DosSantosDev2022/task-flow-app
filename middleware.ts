import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next' // Certifique-se de importar de next-auth/next
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions) // Passa o req diretamente

  // Verifica se a sessão existe
  if (!session) {
    return NextResponse.redirect(new URL('/signIn', req.url))
  }

  return NextResponse.next() // Permite a continuação da solicitação
}

// Especifique quais rotas usarão o middleware
export const config = {
  matcher: ['/app/*'],
}
