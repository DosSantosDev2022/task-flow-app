'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { format, isValid, parse } from 'date-fns' // Incluindo parse para conversão de string para Date
import { LuCalendarDays } from 'react-icons/lu'
import DatePicker from './datePicker'
import { Label } from './label'

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  error?: string
  disabled?: boolean
}

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  error,
  disabled,
}: FormDatePickerProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="text-gray-700">{label}</Label>
      <Popover>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            // Garantir que field.value seja válido
            const parsedDate =
              field.value && isValid(new Date(field.value))
                ? new Date(field.value)
                : field.value
                  ? parse(field.value, 'yyyy-MM-dd', new Date()) // Formato esperado
                  : '' // Se for inválido ou indefinido

            return (
              <>
                <PopoverTrigger
                  className={`w-full p-1 h-10 border rounded-md active:scale-95 duration-300 ${
                    disabled
                      ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                      : 'border-gray-300'
                  }`}
                  disabled={disabled}
                >
                  <div className="flex gap-2 items-center justify-center text-zinc-400">
                    <LuCalendarDays size={18} />
                    {field.value && isValid(parsedDate) ? (
                      <span className="text-sm font-light">
                        {format(parsedDate, 'dd/MM/yyyy')}{' '}
                        {/* Formato para exibição */}
                      </span>
                    ) : (
                      <span className="text-sm font-light ">dd/MM/yyyy</span>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="bg-zinc-50 z-50 shadow-md rounded-md flex items-center justify-center"
                >
                  <DatePicker
                    value={parsedDate || null} // Valor formatado corretamente
                    onChange={(date: Date) => {
                      // Usar toISOString para armazenar a data como ISO, respeitando fuso horário local
                      const localDate = new Date(date.getTime())
                      field.onChange(localDate.toISOString()) // Formato yyyy-MM-dd
                    }}
                  />
                </PopoverContent>
              </>
            )
          }}
        />
      </Popover>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}
