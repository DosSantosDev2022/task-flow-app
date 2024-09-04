import React, { createContext, useContext, useState, ReactNode } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

interface SelectContextProps {
  isOpen: boolean
  selectedOptions: string[]
  toggleOpen: () => void
  selectOption: (option: string) => void
  isSelected: (option: string) => boolean
  isMultiple: boolean
  isSearchable: boolean
  inputValue: string
  setInputValue: (value: string) => void
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined)

const useSelectContext = () => {
  const context = useContext<SelectContextProps | undefined>(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select provider')
  }
  return context
}

interface SelectProviderProps {
  children: ReactNode
  multiple?: boolean
  searchable?: boolean
}

const SelectProvider = ({
  children,
  multiple = false,
  searchable = false,
}: SelectProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const selectOption = (option: string) => {
    if (multiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((opt) => opt !== option)
          : [...prev, option],
      )
    } else {
      setSelectedOptions([option])
      setIsOpen(false)
    }
  }

  const isSelected = (option: string) => selectedOptions.includes(option)

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        selectedOptions,
        toggleOpen,
        selectOption,
        isSelected,
        isMultiple: multiple,
        isSearchable: searchable,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

const SelectRoot = ({ children }: { children: ReactNode }) => {
  return <div className="w-full font-medium">{children}</div>
}

const SelectTrigger = () => {
  const { isOpen, toggleOpen, selectedOptions } = useSelectContext()
  const displayValue =
    selectedOptions.length > 0
      ? selectedOptions.join(', ').substring(0, 25) +
        (selectedOptions.join(', ').length > 25 ? '...' : '')
      : 'Selecione...'

  return (
    <div
      onClick={toggleOpen}
      className="bg-white border w-full p-2 flex items-center justify-between rounded text-gray-500 text-sm cursor-pointer"
    >
      {displayValue}
      <BiChevronDown
        size={20}
        className={
          isOpen
            ? 'rotate-180 duration-300 transition-all'
            : 'duration-300 transition-all'
        }
      />
    </div>
  )
}

const SelectContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useSelectContext()
  return isOpen ? (
    <ul className="bg-white mt-1 overflow-y-auto max-h-32 border rounded-md">
      {children}
    </ul>
  ) : null
}

const SelectOption = ({ option }: { option: string }) => {
  const { selectOption, isSelected, inputValue } = useSelectContext()

  if (inputValue && !option.toLowerCase().includes(inputValue.toLowerCase())) {
    return null
  }

  return (
    <li
      onClick={() => selectOption(option)}
      className={twMerge(
        'p-2 text-sm hover:bg-zinc-300 duration-300 rounded-sm  cursor-pointer',
        isSelected(option) && 'bg-zinc-600 text-white',
      )}
    >
      {option}
    </li>
  )
}

const SelectInput = ({ placeholder = '' }: { placeholder?: string }) => {
  const { isSearchable, inputValue, setInputValue } = useSelectContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  return isSearchable ? (
    <div className="flex items-center px-2 sticky top-0 bg-white">
      <AiOutlineSearch size={18} className="text-gray-300" />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="placeholder:text-gray-300 font-light p-2 outline-none w-full"
      />
    </div>
  ) : null
}

export {
  SelectProvider,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectOption,
  SelectInput,
}
