import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '@/components/global/Form/input'
import { Label } from '@/components/global/Form/label'

interface FormFieldProps {
  label: string
  type: string
  placeholder?: string
  register: UseFormRegisterReturn // Alterado para aceitar o objeto retornado por register()
  error?: FieldError
  disabled?: boolean
}

export const FormField = ({
  label,
  type,
  placeholder,
  register, // Agora é o retorno de register()
  error,
  disabled,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1 w-full">
    <Label>{label}</Label>
    <Input.Root>
      <Input.Input
        className={disabled ? 'cursor-not-allowed' : 'text-sm'}
        type={type}
        placeholder={placeholder}
        {...register} // Espalha as propriedades de register diretamente no input
        disabled={disabled}
      />
    </Input.Root>
    {error?.message && <span className="text-red-800">{error.message}</span>}
  </div>
)
