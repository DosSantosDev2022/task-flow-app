import { Task } from '@prisma/client'
import { Session } from 'next-auth'

export interface getTasksParams {
  page?: number
  limit?: number
  session?: Session | null
  search?: string
  priority?: string
  status?: string
  sort?: string
  sortBy?: string
}

export interface TasksData {
  tasks: Task[]
}

export interface TaskResponse {
  tasks: Task[]
}
