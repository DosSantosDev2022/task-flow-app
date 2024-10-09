import { Client, Project } from '@prisma/client'
import { Session } from 'next-auth'

export interface getClientParams {
  page?: number
  limit?: number
  session?: Session | null
  search?: string
  sort?: string
  sortBy?: string
  state?: string
  city?: string
}

export interface ClientData extends Client {
  Project?: Project
}

export interface ClientsResponse {
  clients: ClientData[]
  totalClients: number
}
