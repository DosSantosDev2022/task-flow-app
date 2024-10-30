import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

interface CustomToken extends JWT {
  id: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    maxAge: 60 * 60 * 24 * 7,
    encode: async ({ secret, token }) => {
      return jwt.sign(token!, secret, { algorithm: 'HS256' })
    },
    decode: async ({ secret, token }) => {
      if (!token) return null
      try {
        return jwt.verify(token, secret) as CustomToken
      } catch (error) {
        console.error('Erro ao decodificar token:', error)
        return null
      }
    },
  },
}
