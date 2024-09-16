import React, { useState, useEffect } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  add,
  sub,
  isSameDay,
} from 'date-fns'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value)

  useEffect(() => {
    setSelectedDate(value)
  }, [value])

  // Avançar para o próximo mês
  const nextMonth = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentDate(add(currentDate, { months: 1 }))
  }

  // Voltar para o mês anterior
  const prevMonth = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentDate(sub(currentDate, { months: 1 }))
  }

  // Calculando o primeiro e último dia do mês atual
  const startOfCurrentMonth = startOfMonth(currentDate)
  const endOfCurrentMonth = endOfMonth(currentDate)

  // Calculando o início e fim da semana para preencher a tabela
  const startDate = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 })
  const endDate = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })

  // Gerar todos os dias que vão aparecer no calendário
  const dates: Date[] = []
  let day = startDate

  while (day <= endDate) {
    dates.push(day)
    day = add(day, { days: 1 })
  }

  // Função para selecionar uma data
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    onChange(date) // Passando a data selecionada para o formulário
  }

  return (
    <div className="w-full max-w-[330px] px-6 py-7 border border-gray-300 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-8 border border-gray-300 w-full justify-between rounded-xl py-0.5 px-0.5 text-sm font-medium text-gray-900">
          <button
            className="text-gray-900 p-2 rounded-lg transition-all duration-500 hover:bg-indigo-100 hover:text-indigo-600"
            onClick={prevMonth}
          >
            <LuChevronLeft />
          </button>
          {format(currentDate, 'MMMM yyyy')}
          <button
            className="text-gray-900 p-2 rounded-lg transition-all duration-500 hover:bg-indigo-100 hover:text-indigo-600"
            onClick={nextMonth}
          >
            <LuChevronRight />
          </button>
        </div>
      </div>

      <table className="pb-3 w-full">
        <thead className="mb-2">
          <tr className="flex">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((dayName) => (
              <td
                key={dayName}
                className="flex items-center justify-center w-10 h-10"
              >
                <p className="text-sm font-medium text-gray-900 rounded-full flex items-center justify-center w-full h-full transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-600">
                  {dayName}
                </p>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(dates.length / 7) }).map(
            (_, weekIndex) => (
              <tr key={weekIndex} className="flex">
                {dates
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((date, dateIndex) => {
                    const isCurrentMonth =
                      date.getMonth() === currentDate.getMonth()
                    const isSelected =
                      selectedDate && isSameDay(date, selectedDate)
                    const isToday = isSameDay(date, new Date())

                    return (
                      <td
                        key={dateIndex}
                        className="flex items-center justify-center w-10 h-10"
                      >
                        <p
                          onClick={() => handleSelectDate(date)}
                          className={`text-sm font-medium cursor-pointer ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-300'
                          } rounded-full flex items-center justify-center w-full h-full transition-all duration-300 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : isToday
                                ? 'bg-indigo-400 text-white'
                                : 'hover:bg-indigo-100 hover:text-indigo-600'
                          }`}
                        >
                          {date.getDate()}
                        </p>
                      </td>
                    )
                  })}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DatePicker
