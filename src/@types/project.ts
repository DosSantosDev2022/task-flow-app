import { Project, Client, Task } from '@prisma/client'
import { Session } from 'next-auth'

export interface getProjectsParams {
  page?: number
  limit?: number
  session?: Session | null
  search?: string
  priority?: string
  status?: string
  sort?: string
  sortBy?: string
}

export interface ProjectData extends Project {
  client: Client
  tasks: Task[]
  progress: number
}

export interface ProjectsResponse {
  projects: ProjectData[]
  totalProjects: number
}
