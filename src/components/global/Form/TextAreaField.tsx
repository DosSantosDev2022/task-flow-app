import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import TextArea from '@/components/global/Form/textArea'
import { Label } from '@/components/global/Form/label'

interface TextAreaFieldProps {
  label: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
  disabled?: boolean
}

export const TextAreaField = ({
  label,
  placeholder,
  register,
  error,
  disabled,
}: TextAreaFieldProps) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <TextArea
      disabled={disabled}
      className={disabled ? 'cursor-not-allowed' : 'text-sm'}
      placeholder={placeholder}
      {...register}
    />
    {error && <span className="text-red-800">{error.message}</span>}
  </div>
)
