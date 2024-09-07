import NextAuth from 'next-auth'
import { User } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
    }
  }

  interface User {
    id: string
  }
}