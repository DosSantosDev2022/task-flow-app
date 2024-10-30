// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
  }
}
