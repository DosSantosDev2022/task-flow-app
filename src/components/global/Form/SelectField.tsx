import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/global/Form/label'

interface SelectFieldProps<TFormValues extends FieldValues> {
  label: string
  options: string[]
  register: UseFormRegister<TFormValues>
  name: Path<TFormValues>
  error?: FieldError
}

export const SelectField = <TFormValues extends FieldValues>({
  label,
  options,
  register,
  name,
  error,
}: SelectFieldProps<TFormValues>) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <div className="w-full mx-auto">
      <select
        {...register(name)}
        className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    {error && <span className="text-red-800">{error.message}</span>}
  </div>
)
