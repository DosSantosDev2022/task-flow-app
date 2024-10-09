import { Controller, FieldError, Control } from 'react-hook-form'
import { Label } from '@/components/global/Form/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/global/Form/select'

export interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps {
  label: string
  options: SelectOption[] // Lista de opções com label e value
  name: string // Nome do campo de formulário
  control: Control<any> // Control do react-hook-form
  error?: FieldError // Erros do campo
  disabled?: boolean // Desabilitar o campo
}

export const SelectField = ({
  label,
  options,
  name,
  control,
  error,
  disabled,
}: SelectFieldProps) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          disabled={disabled}
          value={field.value} // Valor controlado pelo react-hook-form
          onValueChange={field.onChange} // Atualiza o valor no formulário
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    {error?.message && <span className="text-red-800">{error.message}</span>}
  </div>
)
