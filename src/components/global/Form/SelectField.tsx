import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { Label } from '@/components/global/Form/label'

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps {
  label: string
  options: SelectOption[] // Agora aceita um array de objetos contendo label e value
  register: UseFormRegisterReturn // O objeto retornado por register()
  error?: FieldError
}

export const SelectField = ({
  label,
  options,
  register, // Agora é o retorno de register()
  error,
}: SelectFieldProps) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <select {...register} className="text-sm">
      <option value="">Selecione uma opção</option>{' '}
      {/* Placeholder para seleção */}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error?.message && <span className="text-red-800">{error.message}</span>}
  </div>
)
