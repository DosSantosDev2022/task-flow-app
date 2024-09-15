import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import TextArea from '@/components/global/Form/textArea'
import { Label } from '@/components/global/Form/label'

interface TextAreaFieldProps<TFormValues extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<TFormValues>
  name: Path<TFormValues>
  error?: FieldError
}

export const TextAreaField = <TFormValues extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
}: TextAreaFieldProps<TFormValues>) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <TextArea
      className="text-sm"
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <span className="text-red-800">{error.message}</span>}
  </div>
)
