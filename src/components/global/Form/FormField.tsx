import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form'
import { Input } from '@/components/global/Form/input'
import { Label } from '@/components/global/Form/label'

interface FormFieldProps<TFormValues extends FieldValues> {
  label: string
  type: string
  placeholder?: string
  register: UseFormRegister<TFormValues>
  name: Path<TFormValues> // Usar Path para garantir que o nome seja uma chave válida
  error?: FieldError
}

export const FormField = <TFormValues extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  error,
}: FormFieldProps<TFormValues>) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <Input.Root>
      <Input.Input
        className="text-sm"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
    </Input.Root>
    {error?.message && <span className="text-red-800">{error.message}</span>}
  </div>
)
