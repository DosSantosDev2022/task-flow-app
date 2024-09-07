import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'

import { prisma } from '@/lib/prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Configuração para usar JWT
  /* session: {
    strategy: 'jwt',
  }, */
  callbacks: {
    /* async jwt({ token, user }) {
      if (user) {
        console.log('JWT Callback - Token:', token)
        console.log('JWT Callback - User:', user)
        token.id = user.id
      }
      return token
    }, */
    async session({ session, user }) {
      console.log('Session:', session)
      session.user.id = user.id
      return session
    },
  },
  /* secret: process.env.NEXTAUTH_SECRET, */
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
