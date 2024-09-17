// components/Select.tsx
import React from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { twMerge } from 'tailwind-merge'
import { LuChevronDown, LuCheck } from 'react-icons/lu'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const Select = ({ options, label, value, onChange, disabled }: SelectProps) => (
  <RadixSelect.Root value={value} onValueChange={onChange} disabled={disabled}>
    <RadixSelect.Trigger
      className={twMerge(
        'flex h-10 w-full items-center justify-between rounded-md border bg-zinc-50 px-3 py-2 text-sm text-gray-900',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      aria-label={label}
    >
      <RadixSelect.Value placeholder={label} />
      <LuChevronDown className="h-4 w-4 text-gray-500" />
    </RadixSelect.Trigger>

    <RadixSelect.Content className="mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
      <RadixSelect.Viewport>
        {options.map((option) => (
          <RadixSelect.Item
            key={option.value}
            value={option.value}
            className="relative flex w-full cursor-pointer items-center py-2 pl-3 pr-9 text-sm text-gray-900 hover:bg-gray-100"
          >
            <RadixSelect.ItemIndicator>
              <LuCheck className="w-4 h-4 text-blue-600" />
            </RadixSelect.ItemIndicator>
            {option.label}
          </RadixSelect.Item>
        ))}
      </RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Root>
)

export default Select
