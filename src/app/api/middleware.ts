import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]/route'

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions)

  // Aqui você pode redirecionar, retornar uma resposta 401 ou continuar com a solicitação
  if (!session) {
    return NextResponse.redirect(new URL('/signIn', req.url))
  }

  return NextResponse.next() // Permitir a continuação da solicitação
}

// Especifique quais rotas usarão o middleware
export const config = {
  matcher: ['/api/*'],
  // Ajuste conforme necessário
}
