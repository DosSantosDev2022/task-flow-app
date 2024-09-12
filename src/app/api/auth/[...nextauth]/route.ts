import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt', // Definir a estratégia de sessão como JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      // Se este é um novo token de sessão (user logando pela primeira vez), adicionamos o ID do usuário ao token JWT
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Adicionar o ID do usuário à sessão para acesso em frontend
      session.user.id = token.id as string
      console.log('token', token)
      console.log('session', session)
      return session
    },
  },
  // Configurações JWT
  jwt: {
    // Secret para assinar o token
    secret: process.env.JWT_SECRET!,
    // Tempo de expiração do token JWT
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    // Função de codificação customizada
    encode: async ({ secret, token }) => {
      const jwtToken = jwt.sign(token!, secret, { algorithm: 'HS256' })
      return jwtToken
    },
    // Função de decodificação customizada
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret)
      return decodedToken as any
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
