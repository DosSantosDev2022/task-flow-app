import { Controller, FieldError, Control } from 'react-hook-form'
import { Label } from '@/components/global/Form/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/global/Form/select'
import React, { useState } from 'react'

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
  onValueChange?: (value: string) => void
  placeholder?: string
}

export const SelectField = ({
  label,
  options,
  name,
  control,
  error,
  disabled,
  onValueChange,
  placeholder = 'Selecione',
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar a abertura do select

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            disabled={disabled}
            value={field.value} // Valor controlado pelo react-hook-form
            onValueChange={(value) => {
              field.onChange(value)
              if (onValueChange) {
                onValueChange(value)
              }
            }} // Atualiza o valor no formulário
            onOpenChange={setIsOpen} // Atualiza o estado isOpen quando o dropdown é aberto ou fechado
          >
            <SelectTrigger isOpen={isOpen}>
              {' '}
              {/* Passa o estado isOpen para o SelectTrigger */}
              <SelectValue placeholder={placeholder} />
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
}
