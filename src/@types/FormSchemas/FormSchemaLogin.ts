import { z } from 'zod'

export const FormSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string().optional(),
})

export type FormDataLogin = z.infer<typeof FormSchemaLogin>
